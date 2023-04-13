'use client';

// this is a client component
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { AppConfig } from '@/utils/AppConfig';

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);

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
