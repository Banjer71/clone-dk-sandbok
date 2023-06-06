import ProductCard from './components/product-card/product-card';
import {AllProducts, callShopify} from './helpers/shopify';
import React from 'react';

export default async function Home() {
  const response = await callShopify(AllProducts);
  const products = response.data.products.edges;
  return (
    <>
      <div className='text-center'>
        <h1 className='font-bold leading-tight text-palette-primary text-5xl mt-4 py-2 sm:py-4'>
          Books!!
        </h1>
        <p className='px-2 text-lg text-gray-600'>
          Dk Test enviroment with Shopify
        </p>
      </div>
      <div className='max-w-7xl flex flex-wrap mx-auto px-6 pt-10'>
        {products.map((product: any) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </>
  );
}