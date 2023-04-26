// import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  //   const router = useRouter();

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        HOME
      </Main>
    </ThemeProvider>
  );
};

export default Index;
