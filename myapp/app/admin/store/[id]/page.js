'use client'
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import UpdateForm from '@/components/admin/UpdateForm/UpdateForm';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';


const StorePage = (ctx) => {
  const [storeDetails, setStoreDetails] = useState("");
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


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
    setIsUpdateModalOpen(true);
  };
  const handleModalClose = () => {
    setIsUpdateModalOpen(false);
    setIsCreateModalOpen(false);
    fetchProducts();
  };

  return (
    <section>
      <div className='flex flex-col max-w-screen-xl mx-auto gap-6'>
        <span className='text-center text-2xl font-medium text-gray-500 uppercase tracking-wider mt-12 mb-8'>{storeDetails.name}</span>
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
                Name
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Price
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Update
                </th>
              </tr>
            </thead>
            <tbody className='bg-transparent text-gray-500 divide-y divide-gray-200'>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{product.price}</td>
                  <td className='px-6 py-4 whitespace-nowrap flex items-center gap-4'>
                  <span
                    className='text-red-200 hover:text-dark-red-500 text-2xl cursor-pointer'
                    onClick={() => handleDelete(product._id)}
                  >
                    <AiFillDelete />
                  </span>
                  <span
                    className='text-yellow-500 hover:underline text-2xl cursor-pointer'
                    onClick={() => handleUpdateClick(product)}
                  >
                    <AiOutlineEdit />
                  </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
        )}
      </div>
      {isUpdateModalOpen && (
        <UpdateForm product={selectedProduct} onClose={handleModalClose} />
      )}
    </section>
  );
};

export default StorePage;
