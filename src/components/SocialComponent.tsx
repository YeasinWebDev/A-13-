"use client"
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const SocialSignin = () => {
  const searchParems = useSearchParams()
  const path = searchParems.get('redirect')
  const router = useRouter()
  const session = useSession()
  const handleSocialLogin = (provider:string) => {
    const res = signIn(provider)
  }

  if (session.status === 'authenticated') {
    router.push(path ? path : '/')
  }

  return (
    <div className="flex items-center justify-center space-x-3">
      <button onClick={() => handleSocialLogin('google')} className="btn  flex items-center justify-center text-blue-500 border-2 rounded-full">
        <BsGoogle size={20}/>
      </button>

      <button onClick={() => handleSocialLogin('github')} className="btn  flex items-center justify-center border-2 rounded-full ">
        <BsGithub size={20}/>
      </button>
    </div>
  );
};

export default SocialSignin;