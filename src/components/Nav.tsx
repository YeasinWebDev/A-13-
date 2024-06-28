'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Nav() {
  const session = useSession()
  // console.log(session.data)
  return (
    <div>
      <div className="navbar bg-gray-300 md:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item, index) => {
                  return (
                    <Link
                      className="font-bold text-[16px] border-2 border-black p-2 rounded-xl hover:text-primary duration-300"
                      key={index}
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </ul>
          </div>
          <Link className="font-semibold text-2xl" href={'/'}>ProPlaner</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <div className="flex items-center space-x-5">
              {navItems.map((item, index) => {
                return (
                  <Link
                    className="font-bold text-[16px] hover:text-primary duration-300"
                    key={index}
                    href={item.path}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </ul>
        </div>
        <div className="navbar-end">
          {
            session.status === 'authenticated'?
            <>
            <h1 className="font-semibold md:pr-4 pr-1">{session?.data?.user?.name}</h1>
            <div onClick={() => signOut()} className="bg-purple-900 px-5 py-2 text-white rounded-2xl cursor-pointer" >Log out</div>
            </>
            :
            <Link className="bg-purple-900 px-5 py-2 text-white rounded-2xl" href={'/login'}>Sign In</Link>
          }
        </div>
      </div>
    </div>
  );
}

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Create Event",
    path: "/createEvent",
  },
  {
    title: "My Profile",
    path: "/profile",
  },
];

export default Nav;
