import { useRouter } from 'next/router';

const About = () => {
  const { locale } = useRouter();
  return (
    <>
      <h1>Locale : {locale}</h1>
    </>
  );
};
