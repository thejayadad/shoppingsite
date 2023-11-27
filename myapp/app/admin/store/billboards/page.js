'use client'
import BillboardForm from '@/components/admin/BillboardForm/BillboardForm'
import React from 'react'

const Billboards = () => {
  return (
    <section  className='px-4 py-8'>
        <div className='flex justify-between max-w-screen-xl mx-auto'>
            <h2>Billboards</h2>
            <BillboardForm />
        </div>
    </section>
  )
}

export default Billboards