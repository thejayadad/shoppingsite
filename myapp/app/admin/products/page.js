'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Error fetching products');
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <section>
      <h2 className='text-center text-2xl font-medium text-gray-500 uppercase tracking-wider mt-12 mb-12'>Product List</h2>
      {products.length < 1 ? (
        <h3
        className='text-center text-2xl font-medium text-gray-500 uppercase tracking-wider'
        >No Products Available</h3>
      ) : (
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-transparent'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Product Name
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Price
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Store
              </th>
            </tr>
          </thead>
          <tbody className='bg-transparent divide-y divide-gray-200'>
            {products.map((product) => (
              <tr key={product._id}>
                <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{product.price}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={`/store/${product.store._id}`}>
                    <span className='text-indigo-500'>{product.store.name}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Products;
