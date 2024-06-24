'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Nav() {
  const session = useSession()
  console.log(session)
  return (
    <div>
      <div className="navbar bg-gray-300 px-10">
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
                      className="font-semibold border-2 p-2 rounded-xl hover:text-primary duration-300"
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
          <Link className="font-semibold text-lg" href={'/'}>PlanPro</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <div className="flex items-center space-x-5">
              {navItems.map((item, index) => {
                return (
                  <Link
                    className="font-semibold hover:text-primary duration-300"
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
            <div onClick={() => signOut()} className="bg-blue-500 px-3 py-2 text-white rounded-xl cursor-pointer" >Log out</div>
            :
            <Link className="bg-blue-500 px-3 py-2 text-white rounded-xl" href={'/login'}>Sign In</Link>
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
    title: "Event",
    path: "/event",
  },
];

export default Nav;
