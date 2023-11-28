'use client'
import Link from 'next/link'
import React from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'


const Navbar = () => {
    const {data: session} = useSession()

  return (
    <header className='px-6 py-12'>
        <div className='flex justify-between mx-auto max-w-screen-xl'>
            <Link href={'/'}>Logo</Link>
            <div className='flex justify-between gap-6'>
            {
            session?.user
              ? (
                <div>
                  { (
                        <div className='flex gap-6'>
                      <Link
                      className='px-3 py-2 border bg-transparent font-medium text-orange-500  border-orange-500 uppercase tracking-wider hover:bg-orange-500 hover:text-white'
                      href={'/admin'}>Admin</Link>
                      <button 
                      className='font-medium text-gray-500 uppercase tracking-wider hover:bg-gray-500 hover:text-white'
                      onClick={() => {signOut()}}>Logout</button>
                    </div>
                  )}
                </div>
              )
              : (
                <>
                <Link href={'/'}>Login</Link>
                  <Link href='/register'>Register</Link>
                </>
              )
          }
            </div>
        </div>
    </header>
  )
}

export default Navbar