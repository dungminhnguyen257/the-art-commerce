import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import Navbar from '@/pages/navbar';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <ThemeProvider enableSystem={true} attribute="class">
        <Navbar />

        <header className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <h2 className="text-xl">{AppConfig.description}</h2>
          </div>
          <nav>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link
                  href="/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/about/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li className="mr-6">
                <a
                  className="border-none text-gray-700 hover:text-gray-900"
                  href="https://github.com/ixartz/Next-js-Boilerplate"
                >
                  GitHub
                </a>
              </li>
              <li className="mr-6">
                <Link
                  href="/admindashboard/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Dash Board
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </ThemeProvider>
      <main className="content py-5 text-xl">{props.children}</main>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
        <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>.
        {/*
         * PLEASE READ THIS SECTION
         * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
         */}
      </footer>
    </div>
  </div>
);

export { Main };
