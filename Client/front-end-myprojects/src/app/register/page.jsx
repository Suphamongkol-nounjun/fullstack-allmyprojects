"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Registerpage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { data: session } = useSession();
  if (session) redirect('/welcome');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if(password != confirmPassword){
      setError("Password do not match!")
      return;
    }
    if(!email || !password || !confirmPassword ){
      setError("Please complete all inputs!")
      return;
    }
    try {
      // const resCheckUser = await fetch("http://localhost:5000/api/register",{
      //   method: "POST",
      //   headers: {
      //       "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     email
      //   })
      // })

      // const { user } = await resCheckUser.json();
      // if(user){
      //   setError("User already exists!")
      //   return;
      // }
      

      const res = await fetch("http://localhost:5000/api/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,password
        })
      })

      if(res.ok){
          const form = e.target;
          setError("");
          setSuccess("User Registration Successfully")
          form.reset();
          console.log('สมัครเรียบร้อย')
      }else{
        const errorData = await res.json();
        const errorMessage = errorData.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
        console.log(errorMessage);
        setError(errorMessage);
      }

    } catch (error) {
      console.log("error during registration: ", error)
    }

  }

  return (
    <div>
      <Navbar />
      <div className='container mx-auto py-5'>
        <h3>Register page</h3>
        <hr className='my-3'/>        
       <form onSubmit={handleSubmit}>

        {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {success}
          </div>
        )}
        <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md'type="email" placeholder="Enter your email"/>
        <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md'type="password" placeholder="Enter your password"/>
        <input onChange={(e) => setConfirm(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md'type="password" placeholder="Confirm your password"/>
        <button type="submit" className='bg-green-500 p-2 rounded-md text-white'>Sign up</button>
       </form>
       <hr className='my-3'/>
       <p>Do not have an account? go to <Link className="text-blue-500 hover:underline" href="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Registerpage;