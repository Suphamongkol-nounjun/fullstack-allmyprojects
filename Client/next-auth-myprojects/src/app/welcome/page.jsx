"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation";

function Welcomepage() {

  const { data: session } = useSession();
  if (!session) redirect("/login");
  console.log(session)
  return (
    <div>
        <Navbar session={session} />
        <div className='container mx-auto p-2'>
            <h3 className='text-3xl my-3'>Welcome {session?.user?.email}</h3>
            <hr className='my-3'></hr>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quo quae vero officiis veritatis aliquam ducimus ut ex neque fugit. Dolorem dolorum at corrupti incidunt corporis maiores dolores veritatis ipsum!</p>
        </div>
    </div>
  )
}

export default Welcomepage