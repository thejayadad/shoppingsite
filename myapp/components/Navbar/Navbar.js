'use client'
import Link from 'next/link'
import React from 'react'
import { getProviders, signIn, useSession } from "next-auth/react";


const Navbar = () => {
    const session = useSession();

  return (
    <header className='px-4 py-12'>
        <div className='flex justify-between mx-auto max-screen-w-xl'>
            <Link href={'/'}>LOGO</Link>
            <div className='flex gap-4'>
            <button
        onClick={() => {
          signIn("google");
        }}
        >
        Login with Google
      </button>
            </div>
        </div>
    </header>
  )
}

export default Navbar