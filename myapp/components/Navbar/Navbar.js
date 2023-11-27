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
                        <div>
                      <button onClick={() => {signOut()}}>Logout</button>
                      <Link href={'/'}>Create</Link>
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