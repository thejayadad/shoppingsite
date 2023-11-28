'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';
import UpdateForm from '@/components/admin/UpdateForm/UpdateForm';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } else {
        console.error('Error deleting product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Update
              </th>
            </tr>
          </thead>
          <tbody className='bg-transparent divide-y divide-gray-200'>
            {products.map((product) => (
              <tr key={product._id}>
                <td className='px-6 py-4 whitespace-nowrap font-medium text-purple-500 uppercase tracking-wider'>{product.name}</td>
                <td className='px-6 py-4 whitespace-nowrap font-medium text-green-500 uppercase tracking-wider'>${product.price}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link href={`/admin/store/${product.store._id}`}>
                    <span className='text-indigo-500'>{product.store.name}</span>
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap flex gap-2'>
                  
                  <span
                    className='text-red-200 hover:text-dark-red-500 text-2xl'
                    onClick={() => handleDelete(product._id)}
                  >
                    <AiFillDelete />

                  </span>
                  <span
                className='text-indigo-500 hover:underline cursor-pointer'
                onClick={() => handleUpdateClick(product)}
              >
                Edit
              </span>
                        
                </td>
              </tr>
            ))}
          </tbody>
          {isModalOpen && (
        <UpdateForm product={selectedProduct} onClose={handleModalClose} />
      )}
        </table>
      )}
    </section>
  );
};

export default Products;
