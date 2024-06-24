'use client'
import SocialSignin from '@/components/SocialComponent';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'

function SignUpPage() {
  const router = useRouter()
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const newUser = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    }

    const res = await axios.post('/signup/api', newUser)
    if (res.status === 200) {
      form.reset()
      router.push("/login")
    }
  };

  return (
    <div className="w-full mt-14">
      <div className="flex items-center justify-center">
        <div className="border-2 border-gray-500 xl:w-[30vw] px-20 py-5 rounded-xl">
          <h6 className="text-3xl font-semibold text-primary text-center mb-12">
            Sign Up
          </h6>
          <form onSubmit={handleSignUp}>
            <label htmlFor="name">Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="border-2 p-2 rounded-xl border-gray-500 mt-3 w-full input input-bordered text-black"
            />
            <br /> <br />
            <label htmlFor="email">Email</label> <br />
            <input
              type="text"
              name="email"
              placeholder="your email"
              className="border-2 p-2 rounded-xl border-gray-500 mt-3 w-full input input-bordered text-black"
            />
            <br /> <br />
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              name="password"
              placeholder="your password"
              className="border-2 p-2 rounded-xl border-gray-500 w-full mt-3 input input-bordered text-black"
            />
            <br />
            <div className="w-full flex items-center justify-center border-b-2 border-dashed">
              <button
                type="submit"
                className="w-fit px-3 py-2 rounded-xl text-white bg-blue-500 mt-12 text-lg mb-5"
              >
                Sign up
              </button>
            </div>
          </form>
          <div>
            <h6 className="text-center text-lg">or sign up with</h6>
            {/* <SocialSignin /> */}
            <div className="py-2">
              <SocialSignin />
            </div>
            <h6 className="text-center">
              Already have account?{" "}
              <Link className="text-primary font-semibold" href={"/login"}>
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
