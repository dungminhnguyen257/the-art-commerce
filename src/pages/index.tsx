import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ThemeProvider } from 'next-themes';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
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
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar'])),
      // Will be passed to the page component as props
    },
  };
}

export default Index;
