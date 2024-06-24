"use client";
import Link from "next/link";
import React, { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialSignin from "@/components/SocialComponent";
// import SocialSignin from "@/components/SocialCompoenet";
const LoginPage = () => {
  const router = useRouter();
  const session = useSession();
  const searchParems = useSearchParams();
  const path = searchParems.get("redirect");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (session.status === "authenticated") {
      router.push("/");
    }
    if (res !== undefined) {
      if (res.status === 200) {
        form.reset();
        router.push(path ? path : '/');
      }
    }
  };

  return (
    <div className=" w-full mt-14">
      <div className="flex items-center justify-center">
        <div className="border-2 border-gray-500 xl:w-[30vw] px-20 py-5 rounded-xl">
          <h6 className="text-3xl font-semibold text-primary text-center mb-12">
            Sign In
          </h6>
          <form onSubmit={handleLogin} action="">
            <label className="font-semibold text-xl" htmlFor="email">
              Email
            </label>{" "}
            <br />
            <input
              type="text"
              name="email"
              placeholder="your email"
              className="border-2 p-2 rounded-xl border-gray-500 mt-3 w-full input input-bordered text-black"
            />
            <br /> <br />
            <label className="font-semibold text-xl" htmlFor="password">
              Password
            </label>{" "}
            <br />
            <input
              type="password"
              name="password"
              placeholder="your password"
              className="border-2 p-2 rounded-xl border-gray-500 w-full mt-3 input input-bordered text-black"
            />
            <br />
            <div className="w-full flex items-center justify-center border-b-2  border-dashed ">
              <button
                type="submit"
                className="w-fit px-3 py-2 rounded-xl text-white bg-blue-500  mt-12 text-lg mb-5"
              >
                Sign In
              </button>
            </div>
          </form>
          <div>
            <h6 className=" text-center text-lg">or sign in with</h6>
            {/* <SocialSignin /> */}
            <div className="py-2">
              <SocialSignin />
            </div>
            <h6 className=" text-center">
              not have account ?{" "}
              <Link className="text-primary font-semibold" href={"/signup"}>
                Sign Up
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
