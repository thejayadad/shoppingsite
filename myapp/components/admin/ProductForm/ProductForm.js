'use client'
import React, { useState } from 'react';

const ProductForm = ({ storeId, onClose }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          price: parseFloat(productPrice),
          store: storeId,
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log('New Product:', newProduct);
        onClose(); // Close the modal after submitting the form
      } else {
        console.error('Error creating product:', response.status);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-2xl mb-4'>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2'>
            Product Name:
            <input
              type='text'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className='w-full p-2 mb-4 border border-gray-300 rounded'
              required
            />
          </label>
          <label className='block mb-2'>
            Product Price:
            <input
              type='number'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className='w-full p-2 mb-4 border border-gray-300 rounded'
              required
            />
          </label>
          <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
            Create
          </button>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-300 text-black p-2 rounded ml-2'
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
