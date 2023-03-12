/* eslint-disable react-hooks/rules-of-hooks */
import fetcher from '@/lib/fetcher';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { todolists } from '@prisma/client';
import DashboardLayout from 'layouts/DashboardLayout';
import Link from 'next/link';
import useSWR from 'swr';
import Head from 'next/head';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Fragment, useState } from 'react';
import newTodolistSchema from '@/lib/new-todolist-schema';
import { newTodolistValues } from 'types/types';
import { useRouter } from 'next/router';
import TodoList from '@/components/todo/TodoList';





const Page: React.FC<{ user: UserProfile }> = ({ user }) => {
  const { data: todolists } = useSWR<todolists[]>(
    '/api/todo/get-all-todolists',
    fetcher
  );

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<newTodolistValues>({
    resolver: zodResolver(newTodolistSchema),
  });

  const router = useRouter();

  const createNewTodolist = (data: newTodolistValues) => {
    const createNewTodolistRequest = axios
      .post('/api/todo/create-todolist', data)
      .then((res) => {
        router.push('/app/todo/' + res.data.id);
      });
    toast.promise(createNewTodolistRequest, {
      loading: 'Creating new todolist',
      error: 'Error creating new todolist',
      success: 'Successfully created new todolist',
    });
  };

  return (
    <div>
      <Head>
        <title>{user.name || user.nickname}&apos;s Todolists</title>
      </Head>

      <DashboardLayout>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">
            {user.name || user.nickname}&apos;s Todolist
          </h1>
        </div>
        <div className = "todo-app">
          <TodoList/>
        </div>
      </DashboardLayout>

    

    </div>
  );
};

export default withPageAuthRequired(Page);
