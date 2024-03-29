'use client'
import Stats from '@/components/Stats/Stats';
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Admin = () => {
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
    <section className='px-6 py-12'>
      <Stats />
      <div className='mt-6'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-transparent'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Store Name
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Details
              </th>
            </tr>
          </thead>
          <tbody className='bg-transparent divide-y divide-gray-200'>
            {stores.map((store) => (
              <tr key={store._id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={`/admin/store/${store._id}`}>
                    <span className='text-indigo-500'>{store.name}</span>
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link
                className='font-medium text-blue-500 uppercase tracking-wider border border-blue-500 rounded- xl px-8  py-2 mt-8 hover:bg-blue-500 hover:text-white'
                href={`/admin/store/${store._id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Admin;
