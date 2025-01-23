"use client";

import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/utils/constants/routes";
import { signIn } from "next-auth/react";

export default function SocialButtons() {
  const handleClick = async (provider: "google") => {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-base-100 px-2 text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <button className="btn btn-outline" onClick={() => handleClick("google")}>
        <FcGoogle className="w-5 h-5 mr-2" />
        Google
      </button>
    </>
  );
}
