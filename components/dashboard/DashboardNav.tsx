import ProfileDropdown from './ProfileDropdown';
import Logo from '@/public/logos/logo-transparent.png';
import Image from 'next/image';
import Link from 'next/link';
import CommandPalette from './CommandPalette';

const DashboardNav = (props) => {
  return (
    <div
      className='flex items-center justify-between px-2 py-4 mx-auto max-w-7xl'
      {...props}>
      <div style={{ zoom: '0.8' }}>
        <Link href='/app'>
          <a>
            <div style={{ zoom: 0.45 }}>
              <Image src= {Logo} alt='JotMe' priority placeholder='blur' />
            </div>
          </a>
        </Link>
      </div>
      <div>
        <ProfileDropdown />
        <CommandPalette />
      </div>
    </div>
  );
};

export default DashboardNav;
