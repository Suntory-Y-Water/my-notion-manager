'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookTitleForm from '../components/BookTitleForm';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetch('api/verifyToken')
      .then((res) => res.json())
      .then((data) => {
        if (!data.isValid) {
          // トークンが無効ならログインページにリダイレクト
          router.push('/');
        }
      });
  }, []);

  return (
    <main>
      <div className='flex flex-col items-center  min-h-screen py-4 bg-gray-200 ml-4 mr-4'>
        <h1 className='text-3xl font-bold text-gray-700 mt-12 '>Personal BookNotion</h1>
        <div className='w-full max-w-xl mt-8'>
          <div className='w-full px-8 py-6 bg-white shadow-md rounded-lg'>
            <BookTitleForm />
          </div>
        </div>
      </div>
    </main>
  );
}
