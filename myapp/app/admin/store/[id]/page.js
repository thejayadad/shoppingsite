'use client'
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import React, { useEffect, useState } from 'react';

const StorePage = (ctx) => {
  const [storeDetails, setStoreDetails] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      const res = await fetch(`http://localhost:3000/api/store/${ctx.params.id}`, { cache: 'no-store' });
      const data = await res.json();
      setStoreDetails(data.store);
      setProducts(data.products);
    };

    fetchStore();
  }, [ctx.params.id]);

  return (
    <section>
      <div className='flex max-w-screen-xl mx-auto gap-6'>
        <span>{storeDetails.name}</span>
        {products.length < 1 ? (
          <h3>No Products</h3>
        ) : (
          products.map((product) => (
            <p key={product._id}>{product.name}</p>
          ))
        )}
      </div>
      <ProductForm storeId={ctx.params.id} />
    </section>
  );
}

export default StorePage;
