'use client'
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Admin = (ctx) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStoreNames();
  }, []);

  const fetchStoreNames = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/store');
      if (response.ok) {
        const data = await response.json();
        setStores(data);
      } else {
        console.error('Error fetching store names');
      }
    } catch (error) {
      console.error('Error fetching store names', error);
    }
  };

  return (
    <section className='px-6 py-12 bg-gray-500'>
      <h2>Welcome</h2>
      <div>
        {stores.map((store) => (
          <div key={store._id}>
            <Link
            href={`/admin/store/${store._id}`}
            >StoreName: {store.name}</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Admin;
