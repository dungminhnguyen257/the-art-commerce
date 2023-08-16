import type { GetServerSideProps, NextPage } from 'next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartPageProps {
  cartItems: CartItem[];
}

const CartPage: NextPage<CartPageProps> = ({ cartItems }) => {
  return (
    <Main meta={<Meta title="Cart" description="Cart" />}>
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">Cart</h1>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Please add an item</p>
        )}
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  CartPageProps
> = async () => {
  // Fetch the cart items from your backend API based on the user session
  const cartItems = await fetch('http://localhost:3000/api/cart').then(
    (response) => response.json()
  );

  return {
    props: {
      cartItems,
    },
  };
};

export default CartPage;
