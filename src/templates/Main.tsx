import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

import Navbar from '@/pages/navbar';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <div className="w-full px-1 antialiased">
        {props.meta}

        <div className="mx-auto max-w-screen-md">
          <header className="border-b border-gray-300">
            <div className="pt-16 pb-8">
              <h2 className="text-xl">{AppConfig.description}</h2>
            </div>
            <div
              style={{ color: theme === 'dark' ? 'text-white' : 'text-black' }}
            >
              <nav>
                <ul className="flex flex-wrap text-xl">
                  <li className="mr-6">
                    <Link
                      href="/"
                      className="border-none hover:text-yellow-900"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      href="/cart/"
                      className="border-none hover:text-yellow-900"
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      href="/view-product/"
                      className="border-none hover:text-yellow-900"
                    >
                      view-product
                    </Link>
                  </li>
                  <li className="mr-6">
                    <a
                      className="border-none hover:text-yellow-900"
                      href="https://github.com/ixartz/Next-js-Boilerplate"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="content py-5 text-xl">{props.children}</main>

          <footer className="border-t border-gray-300 py-8 text-center text-sm">
            © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
            <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>.
          </footer>
        </div>
      </div>
    </>
  );
};

export { Main };
