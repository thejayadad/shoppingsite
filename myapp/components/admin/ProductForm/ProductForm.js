'use client'
import React, { useState } from 'react';

const ProductForm = ({ storeId }) => {
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
      } else {
        console.error('Error creating product:', response.status);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <section>
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Product Price:
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Product</button>
      </form>
    </section>
  );
};

export default ProductForm;
