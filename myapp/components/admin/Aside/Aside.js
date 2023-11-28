'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Aside = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateStore = async () => {
    if (!storeName) {
      toast.error('Please enter a store name');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: storeName }),
      });

      if (res.ok) {
        toast.success('Store created successfully');
        setTimeout(() => {
          closeModal();
          setLoading(false);
          router.push('/admin'); 
        }, 1500);
      } else {
        toast.error('Error occurred while creating the store');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during store creation:', error);
      toast.error('Error occurred while creating the store');
      setLoading(false);
    }
  };

  return (
    <aside className='px-6 py-4 flex items-center gap-4 md:flex md:flex-col'>
      <button onClick={openModal} 
          className='font-medium text-blue-500 uppercase tracking-wider border border-blue-500 rounded- xl px-8  py-2 mt-8 hover:bg-blue-500 hover:text-white'
          >
        Create Store
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h2 className='text-2xl mb-4'>Create Store</h2>
            <label className='block mb-2'>Store Name:</label>
            <input
              type='text'
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className='w-full p-2 mb-4 border border-gray-300 rounded'
            />
            <button onClick={handleCreateStore}
          className='font-medium text-blue-500 uppercase tracking-wider border border-blue-500  px-8  py-2 mt-8 hover:bg-blue-500 hover:text-white'
          >
              {loading ? 'Creating...' : 'Create'}
            </button>
            <button onClick={closeModal} className='bg-gray-300 text-black p-2 rounded ml-2'>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        <Link
          className='font-medium text-orange-500 uppercase tracking-wider border border-orange-500 px-8  py-2 mt-8 hover:bg-orange-500 hover:text-white'
          href={'/admin/products'}>All Products</Link>
      </div>
      <ToastContainer />
    </aside>
  );
};

export default Aside;
