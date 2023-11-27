'use client'
import Link from 'next/link'
import React from 'react'

const AdminNav = () => {
  return (
    <header className='border-b'>
        <div className='flex h-16 items-center px-4'>
        <Link href={'/admin'}>Dashboard</Link>
        <div className='ml-auto flex items-center space-x-4'>
        After SignOut
        </div>
        </div>
    </header>
  )
}

export default AdminNav