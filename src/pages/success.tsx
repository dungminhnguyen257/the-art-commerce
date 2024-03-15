import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  const router = useRouter();
  const { firstName, lastName, address, email, phone } = router.query;

  return (
    <div>
      <Head>
        <title>{firstName}'s Account</title>
        <meta name="description" content="Success Page" />
      </Head>
      <h1>Welcome to our store {firstName}!</h1>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Address: {address}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>

      <Link href="/">
        <p>Home Page</p>
      </Link>
    </div>
  );
}
