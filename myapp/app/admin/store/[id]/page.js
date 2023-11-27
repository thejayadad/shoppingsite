'use client'
import React, { useEffect, useState } from 'react';

const StorePage = (ctx) => {
  const [storeDetails, setStoreDetails] = useState("")
  useEffect(() => {
    async function fetchStore() {
        const res = await fetch(`http://localhost:3000/api/store/${ctx.params.id}`, { cache: 'no-store' })
        const store = await res.json()

        setStoreDetails(store)
    }
   fetchStore()
}, [storeDetails])
  return (
    <section>
        <div className='flex max-w-screen-xl mx-auto gap-6'>
          <span>{storeDetails.name}</span>
        </div>
    </section>
  )
}

export default StorePage