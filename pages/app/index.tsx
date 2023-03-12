import NoteCard from '@/components/note/NoteCard';
import StickyNoteCard from '@/components/stickyNote/StickyNoteCard';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardLayout from 'layouts/DashboardLayout';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Head from 'next/head';
import { DashboardData } from 'types/types';
import truncate from 'lodash.truncate';
import { HiOutlineClipboard } from 'react-icons/hi';
import toast from 'react-hot-toast';

const indexPage: React.FC<{ user: UserProfile }> = ({ user }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSWR<DashboardData>('/api/get-dashboard-data', fetcher);
  console.log(data);
  return (
    <DashboardLayout>
      <Head>
        <title>{user.name}&apos;s Dashboard | JotMe </title>
      </Head>
      <div>
        <div className='flex flex-wrap items-center justify-around w-full px-5 py-3 mt-1 mb-5'>
          {links.map((link) => (
            <div
              key={link.path}
              className='px-3 py-1 my-1 text-base border border-gray-300 rounded shadow-inner hover:bg-gray-100 bg-gray-50'>
              <Link href={link.path}>
                <a>{link.title}</a>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <div className='flex flex-wrap justify-around w-full max-w-5xl'>
            <div className='w-full max-w-md px-4 py-2 mx-auto'>
              <h3 className='my-3 text-lg font-medium'>Your Whiteboards</h3>
              {data?.boards?.map((board) => (
                <Link key={board?.id} href={'/app/whiteboard/' + board?.id}>
                  <a className='block'>
                    <div className='w-full px-2 py-1 my-3 rounded bg-gray-50 hover:bg-gray-100'>
                      <p className='capitalize'>
                        {truncate(board?.boardName, { length: 50 })}
                      </p>
                    </div>
                  </a>
                </Link>
              )) || (
                <Skeleton
                  count={4}
                  height='30px'
                  className='w-full px-2 py-1 my-1'
                />
              )}
              {data?.boards?.length == 0 && (
                <div className='w-full px-2 py-1 my-3 rounded bg-gray-50 hover:bg-gray-100'>
                  <p>
                    Hey {user.name}, you haven&apos;t created any whiteboards
                    yet!!
                  </p>
                  <p>{'¯\\_(ツ)_/¯'}</p>
                </div>
              )}
            </div>
            <div className='w-full max-w-sm px-4 py-2 mx-auto'>
              <h3 className='my-3 text-lg font-medium'>Your Sticky Notes</h3>
              {data?.stickyNotes?.map((stickyNote) => (
                <div key={stickyNote?.id} className='relative group'>
                  <Link href={'/app/sticky-notes'}>
                    <a className='block '>
                      <p className='my-3' style={{ color: stickyNote?.color }}>
                        {truncate(stickyNote?.stickyNote, { length: 70 })}
                      </p>
                    </a>
                  </Link>
                  <div
                    className='absolute top-0 z-10 hidden px-1 py-px border rounded cursor-pointer group-hover:inline-block group-focus:inline-block right-2 backdrop-filter backdrop-blur-sm bg-white/50'
                    onClick={() => {
                      window.navigator.clipboard
                        .writeText(stickyNote?.stickyNote)
                        .then(() => toast.success('Copied to clipboard!!'));
                    }}>
                    <HiOutlineClipboard className='relative inline-block w-4 h-4 text-gray-600 bottom-[2px]' />
                  </div>
                </div>
              )) || <Skeleton count={4} className='w-full px-2 py-1 my-2' />}
              {data?.stickyNotes?.length == 0 && (
                <div className='w-full px-2 py-1 my-3'>
                  <p>
                    Hey {user.name}, you haven&apos;t created any sticky notes
                    yet!!
                  </p>
                  <p>{'¯\\_(ツ)_/¯'}</p>
                </div>
              )}
            </div>
            {/* <div className='max-w-xl px-4 py-2 mx-auto rounded shadow'></div> */}
          </div>
          
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withPageAuthRequired(indexPage);

const links = [
  {
    path: '/app/whiteboard',
    title: 'Whiteboards',
  },
  {
    path: '/app/sticky-notes',
    title: 'Sticky Notes',
  },
  {
    path: '/app/pomorodo',
    title: 'Pomodoro',
  },
  {
    path: '/app/playgrounds',
    title: 'Web Playground',
  },
  {
    path: '/app/todo',
    title: 'Todo-Lists',
  },
];
