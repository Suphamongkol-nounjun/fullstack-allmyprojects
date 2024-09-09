"user client"
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Navbar({session}) {
  return (
    <nav className='bg-[#333] text-white p-5'>
      <div className="container mx-auto">
        <div className='flex justify-between items-center'>
            <div>
                <Link href="/welcome">Home page</Link>
            </div>
            {/* <div>
            <Link href="/user">user</Link>
            </div>
            <div>
            <Link href="/admin">admin</Link>
            </div> */}
            <ul className='flex'>
                {!session ? (
                  <>
                  <li className='mx-3'><Link href="/login">Sign in</Link></li>
                  <li className='mx-3'><Link href="/register">Sign up</Link></li>
                  </>
                ) : (
                  <>
                <li className='mx-3'>
                  <Link href='/user' className='bg-gray-500 text-white border py-2 px-3 rounded-md texy-lg my-2'>
                    user
                  </Link>
                </li>
                <li className='mx-3'>
                  <Link href='/admin' className='bg-gray-500 text-white border py-2 px-3 rounded-md texy-lg my-2'>
                    admin
                  </Link>
                </li>
                <li className='mx-3'>
                  <Link href='/welcome' className='bg-gray-500 text-white border py-2 px-3 rounded-md texy-lg my-2'>
                    Home page
                  </Link>
                </li>
                  <li className='mx-3'><a onClick={() => signOut({callbackUrl: '/login'})} className='bg-red-500 text-white border py-2 px-3 rounded-md texy-lg my-2'>Logout</a></li>
                  </>
                )
                }
            </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
