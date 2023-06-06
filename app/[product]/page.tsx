import Image from 'next/image';
import {callShopify, singleProduct} from '../helpers/shopify';
import {BuyButton} from './buy-button';
import React from 'react';

const Product = async ({params}: any) => {
  const response = await callShopify(singleProduct, {handle: params.product});
  const productData = response.data.product;
  

  const imageNode = productData.images.edges[0].node;
  const title = productData.title;
  const price = productData.priceRange.maxVariantPrice.amount.replace(
    /\.0/g,
    '',
  );
  const description = productData.description;
  const productVariant = productData.variants.edges[0].node.id;


  return (
    <div
      className='
        px-4
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-col my-0 mx-auto
        max-w-7xl
      '>
      <div className='w-full flex flex-1'>
        <div className='w-full h-full relative'>
          <Image
            src={imageNode.url}
            alt=''
            width={imageNode.width}
            height={imageNode.height}
            className='w-full h-auto'
          />
        </div>
      </div>
      <div className='pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2'>
        <h1
          className='
           sm:mt-0 mt-2 text-5xl font-light leading-large
          '>
          {title}
        </h1>
        <h2 className='text-2xl tracking-wide sm:py-8 py-6'>${price}</h2>
        <p className='text-gray-600 leading-7'>{description}</p>
        <div className='my-6'></div>
        <BuyButton productVariant={productVariant} />
      </div>
    </div>
  );
}
export default Product;