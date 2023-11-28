'use client'
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import React, { useEffect, useState } from 'react';

const StorePage = (ctx) => {
  const [storeDetails, setStoreDetails] = useState("");
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      const res = await fetch(`http://localhost:3000/api/store/${ctx.params.id}`, { cache: 'no-store' });
      const data = await res.json();
      setStoreDetails(data.store);
      setProducts(data.products);
    };

    fetchStore();
  }, [ctx.params.id]);

  const openProductForm = () => {
    setIsProductFormOpen(true);
  };

  const closeProductForm = () => {
    setIsProductFormOpen(false);
  };

  return (
    <section>
      <div className='flex flex-col max-w-screen-xl mx-auto gap-6'>
        <span className='text-center text-2xl font-medium text-gray-500 uppercase tracking-wider mt-8 mb-8'>{storeDetails.name}</span>
        <button
        onClick={openProductForm} className='border-purple-500 font-medium text-gray-500 uppercase tracking-wider p-2 rounded mt-4 max-w-xs mx-auto'>
        Add Product
      </button>
      {isProductFormOpen && (
        <ProductForm storeId={ctx.params.id} onClose={closeProductForm} />
      )}
        {products.length < 1 ? (
          <h3>No Products</h3>
        ) : (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-transparent'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Product Name
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Product Price
                </th>
              </tr>
            </thead>
            <tbody className='bg-transparent text-gray-500 divide-y divide-gray-200'>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </section>
  );
};

export default StorePage;
