'use client';

// this is a client component
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import Spinner from '@/lib/common-ui/spinner';
import { AppConfig } from '@/utils/AppConfig';

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleSignOut = async () => {
    const data = await signOut({
      callbackUrl: '/',
      redirect: false,
    });
    // redirect user to home page without page reload,
    // see: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option-1
    router.push(data.url);
  };

  return (
    <header className="sticky top-0 z-50 mx-auto w-full px-4 dark:border-b dark:border-stone-300 sm:px-20 ">
      <div className="justify-between md:flex md:items-center">
        <div>
          <div className="flex items-center justify-between py-3">
            <div className="md:block md:py-5 ">
              <h2 className="text-2xl font-bold">{AppConfig.title}</h2>
            </div>
            <div className="md:hidden">
              <button onClick={() => setNavbar(!navbar)}>
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <div>
              <ul className="flex flex-wrap text-xl">
                <li>
                  <Link
                    href="/"
                    className="block py-2 hover:text-yellow-900 md:p-4"
                  >
                    Home
                  </Link>
                </li>
                {session && !loading && (
                  <>
                    <li>
                      <Link
                        href="/api/account"
                        className="block py-2 hover:text-yellow-900 md:p-4"
                      >
                        {/* 👤 */}
                        {session.user?.email || session.user?.name}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/api/auth/signout"
                        className="block py-2 hover:text-yellow-900 md:p-4"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </Link>
                    </li>
                  </>
                )}
                {!session && !loading && (
                  <li>
                    <Link
                      href="/api/auth/signin"
                      className="block py-2 hover:text-yellow-900 md:p-4"
                      onClick={(e) => {
                        e.preventDefault();
                        // https://next-auth.js.org/getting-started/client#signin
                        signIn('google');
                      }}
                    >
                      {/* 👤 */}
                      Sign in
                    </Link>
                  </li>
                )}
                {loading && <Spinner />}
                <li>
                  <Link
                    href="/cart"
                    className="block py-2 hover:text-yellow-900 md:p-4"
                  >
                    🛒
                  </Link>
                </li>
              </ul>
            </div>
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {currentTheme === 'dark' ? (
                <button
                  onClick={() => setTheme('light')}
                  className="rounded-xl bg-slate-100 p-2"
                >
                  <RiSunLine size={25} color="black" />
                </button>
              ) : (
                <button
                  onClick={() => setTheme('dark')}
                  className="rounded-xl bg-slate-100 p-2"
                >
                  <RiMoonFill size={25} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
