"use client";

import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from 'next/link'
import { signIn } from "next-auth/react";
import { useRouter,redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function Loginpage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

   const router = useRouter();

   const { data: session } = useSession();
   useEffect(() => {
    if (session) {
      router.replace('welcome');
    }
  }, [session, router]);

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const res = await signIn("credentials", {
            email, password, redirect: false
        })

        if (res.error) {
            setError("Invalid credentials");
            return;
        }

         router.replace("welcome");

    } catch(error) {
        console.log(error);
    }
}

  return (
    <div>
      <Navbar />
      <div className='container mx-auto py-5'>
        <h3>Login page</h3>
        <hr className='my-3'/>        
       <form onSubmit={handleSubmit}>

       {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 ">
            {error}
          </div>
        )}

        <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md'type="email" placeholder="Enter your email"/>
        <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md'type="password" placeholder="Enter your password"/>
        <button type="submit" className='bg-green-500 p-2 rounded-md text-white'>Sign In</button> 
        <p><Link className="text-blue-500 hover:underline" href="/resetpassword">Forgot your password?</Link></p>
       </form>
       <hr className='my-3'/>
        <div className="px-6 sm:px-0 max-w-sm">
        <button type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
        </div>
       <hr className='my-3'/>
       <p>Already have an account? go to <Link className="text-blue-500 hover:underline" href="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Loginpage;
