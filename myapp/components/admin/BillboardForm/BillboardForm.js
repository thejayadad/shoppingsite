'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BillboardForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [label, setLabel] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleCreateStore = async () => {
      if (!label) {
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
          body: JSON.stringify({ label: label }),
        });
  
        if (res.ok) {
          toast.success('Store created successfully');
          setTimeout(() => {
            closeModal();
            setLoading(false);
            router.push('/admin'); // Redirect to /admin after successful creation
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
    <div>
    <button onClick={openModal} className='bg-blue-500 text-white p-2 rounded'>
        Create BillBoard
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h2 className='text-2xl mb-4'>Create BillBoard</h2>
            <label className='block mb-2'>BillBoard Label:</label>
            <input
              type='text'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className='w-full p-2 mb-4 border border-gray-300 rounded'
            />
            <button onClick={handleCreateStore} className='bg-blue-500 text-white p-2 rounded'>
              {loading ? 'Creating...' : 'Create'}
            </button>
            <button onClick={closeModal} className='bg-gray-300 text-black p-2 rounded ml-2'>
              Cancel
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default BillboardForm