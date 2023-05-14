'use client';

// this is a client component
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import Spinner from '@/lib/common-ui/spinner';
import { AppConfig } from '@/utils/AppConfig';

import logo from '../../public/assets/images/logo-2023.png';

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);
  const { locale, push } = useRouter();
  const { t } = useTranslation('navbar');
  const handleClick = () => {
    push('/', undefined, { locale: locale === 'en' ? 'vi' : 'en' });
  };
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleSignOut = async () => {
    const data = await signOut({
      callbackUrl: '/',
      redirect: false,
    });
    // redirect user to home page without page reload,
    // see: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option-1
    push(data.url, undefined, { locale: locale === 'en' ? 'vi' : 'en' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto w-full bg-white px-4 dark:border-b dark:border-stone-300 sm:px-20 ">
        <div className="justify-between md:flex md:items-center">
          <div className="flex flex-row">
            <Image src={logo} alt="company's logo" width={80} height={0} />
            <div className="flex items-center justify-between py-3">
              <div className="md:flex md:py-5 ">
                <h2 className="text-2xl font-bold text-yellow-600">
                  {AppConfig.title}
                </h2>
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
              className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:flex md:pb-0 ${
                navbar ? 'flex' : 'hidden'
              }`}
            >
              <div>
                <ul className="flex flex-wrap text-xl">
                  <li>
                    <Link
                      href="/"
                      className="flex p-2 hover:text-yellow-900 md:p-4"
                    >
                      {t('Home')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart/"
                      className="flex p-2 hover:text-yellow-900 md:p-4"
                    >
                      {t('Your Cart')}
                    </Link>
                  </li>
                  {session && !loading && (
                    <>
                      <li>
                        <Link
                          href="/api/account"
                          className="block py-2 hover:text-yellow-900 md:p-4"
                        >
                          {session.user?.name || session.user?.email}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/api/auth/signout"
                          className="block py-2 hover:text-yellow-900 md:p-4"
                          onClick={handleSignOut}
                        >
                          {t('Sign Out')}
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
                          signIn();
                        }}
                      >
                        {t('Sign In')}
                      </Link>
                    </li>
                  )}
                  {loading && (
                    <li>
                      <Spinner />
                    </li>
                  )}
                </ul>
              </div>
              <div className="items-center justify-center space-y-8 p-4 md:flex md:space-x-6 md:space-y-0">
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

              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                color="primary"
                startIcon={<TranslateIcon />}
                onClick={handleClick}
              >
                {t('Language')}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'navbar'])),
      // Will be passed to the page component as props
    },
  };
}

export default Navbar;
