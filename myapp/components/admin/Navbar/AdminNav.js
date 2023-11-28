'use client'
import Link from 'next/link'
import React from 'react'

const AdminNav = () => {
  return (
    <header className='border-b'>
        <div className='flex h-16 items-center px-4 font-medium text-gray-500 uppercase tracking-wider'>
        <Link
        
        href={'/admin'}>Dashboard</Link>
        <div className='ml-auto flex items-center space-x-4'>
        SignOut
        </div>
        </div>
    </header>
  )
}

export default AdminNav