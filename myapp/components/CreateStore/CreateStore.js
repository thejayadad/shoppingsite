"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateStore = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("")


    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/stores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
  
        if (!response.ok) {
          throw new Error('Error creating store');
        }
  
        toast.success('Store created successfully');
        handleCloseModal();
      } catch (error) {
        console.error(error);
        toast.error('Error creating store');
      }
    };
  return (
    <div>
      <button onClick={handleOpenModal} className="border-gray-300">
       NewStore
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
        
            <h5 className="text-2xl mb-4">CreateStore</h5>
            <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder='StoreName...' onChange={(e) => setName(e.target.value)} />
                    <button onClick={handleCloseModal} className="btn btn-secondary">
                      Close
                    </button>
                    <button className="bg-primary ml-4" type="submit">CreateStore</button>
               </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateStore