import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  // <Image src= alt='JotMe' priority placeholder='blur' />
  return (
    <div className='flex items-center justify-around h-full py-4 border-b border-b-gray-300'>
      <div style={{ zoom: 0.7 }}>
        <h1>JotMe Logo Goes Here</h1>
      </div>
      <div className='flex flex-row gap-3'>
        <Link href='/signup'>
          <a className='px-3 py-1 bg-gray-700 rounded shadow text-gray-50 hover:bg-gray-900'>
            Sign up
          </a>
        </Link>
        <Link href='/login'>
          <a className='px-3 py-1 bg-gray-700 rounded shadow text-gray-50 hover:bg-gray-900'>
            Login
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
