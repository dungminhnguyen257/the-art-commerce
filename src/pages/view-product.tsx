import type { ProductResponse } from '@lib/product/dto';
import { get } from '@lib/utils/http';
import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

interface ProductPageProps {
  products: ProductResponse[];
}

const ProductPage: NextPage<ProductPageProps> = ({ products }) => {
  const { t } = useTranslation('view-product');

  return (
    <Main meta={<Meta title="View Product" description="View Product" />}>
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">{t('Product Page')}</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                // src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                <p className="mb-4 text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-700">
                    ${product.price}
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                      {t('Add to Cart')}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const products = await get('http://localhost:3000/api/products');

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'view-product',
      ])),
      products,
    },
  };
};
export default ProductPage;
