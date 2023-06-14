import type { ProductResponse } from '@lib/product/dto';
import { get } from '@lib/utils/http';
import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

interface ProductPageProps {
  products: ProductResponse[];
}

const ProductPage: NextPage<ProductPageProps> = ({ products }) => {
  return (
    <Main meta={<Meta title="View Product" description="View Product" />}>
      <div>
        <h1>Productpage</h1>
        <h2>Featured Products</h2>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async () => {
  const products = await get('http://localhost:3000/api/products');

  return {
    props: {
      products,
    },
  };
};

export default ProductPage;
