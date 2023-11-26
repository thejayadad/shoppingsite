import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
  return (
    <header className='px4 py-12'>
        <div className='flex justify-between max-w-xl mx-auto'>
            <Link href={'/'}>WalletWorld</Link>
            <nav className='flex gap-6'>
            {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar