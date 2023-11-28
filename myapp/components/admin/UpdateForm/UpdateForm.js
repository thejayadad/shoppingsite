'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateForm = ({ product, onClose }) => {
  const [productName, setProductName] = React.useState(product.name);
  const [productPrice, setProductPrice] = React.useState(product.price);
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/product/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          price: parseFloat(productPrice),
        }),
      });

      if (response.ok) {
        toast('Product updated successfully', { appearance: 'success', autoDismiss: true });
        onClose();
        router.push('/admin');
      } else {
        console.error('Error updating product:', response.status);
        toast('Failed to update product', { appearance: 'error', autoDismiss: true });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast('Failed to update product', { appearance: 'error', autoDismiss: true });
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline"
        >
          <div 
          style={{background: '#222'}}
          className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <span
              type="button" className="close-button text-2xl cursor-pointer text-red-600" onClick={onClose}
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-4 font-medium text-gray-500 uppercase tracking-wider">
                Product Name:
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="form-input text-sm mt-1 block w-full bg-transparent"
                />
              </label>
              <label className="block mb-4 font-medium text-gray-500 uppercase tracking-wider">
                Product Price:
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  className="form-input mt-1 block w-full bg-transparent"
                />
              </label>
              <button type="submit" className="hover:text-white text-blue-700 py-2 px-4 rounded hover:bg-blue-700">
                Update Product
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />

      </div>
    </div>
  );
};

export default UpdateForm;
