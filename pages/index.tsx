import Nav from '@/components/Nav';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    router.prefetch('/app');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    router.push('/app');
  }

  return (
    <div>
      <Nav />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
          <h1 className='text-6xl font-bold'>JotMe</h1>
          <p className='mt-3 text-2xl'>
            A simple, free, and multifaceted productivity app for developers.
          </p>
          <div className='flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
            <a
              href='/api/auth/login'
              className='px-4 py-2 my-3 text-lg font-medium text-white bg-blue-500 rounded shadow hover:bg-orange'>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
