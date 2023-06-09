'use client';
import React from 'react';
import {useState} from 'react';

export const BuyButton = ({productVariant}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async () => {
    const fetchUrl = '../api/checkout';

    const fetchOptions = {
      endpoint: fetchUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variantId: productVariant,
      }),
    };

    try {
      setIsLoading(true);

      const response = await fetch(fetchUrl, fetchOptions);

      if (!response.ok) {
        let message = await response.json();
        message = message.error;
        throw new Error(message);
      }

      const data = await response.json();
      const {checkoutURL} = data;
      window.location.href = checkoutURL;
    } catch (e: any) {
      throw new Error(e);
    }
  };
  return (
    <button
      className='text-sm tracking-wider bg-black text-white font-semibold py-4 px-12 border-2 border-black hover:border-transparent w-full'
      onClick={checkout}>
      {isLoading && (
        <svg
          className='inline animate-spin -ml-1 mr-3 h-5 w-5 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
        </svg>
      )}
      <span>Buy</span>
    </button>
  );
};