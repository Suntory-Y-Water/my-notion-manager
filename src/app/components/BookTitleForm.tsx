import React, { useState } from 'react';

const BookTitleForm = () => {
  const [bookName, setBookName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const bookName = formData.get('bookname');

    try {
      const response = await fetch('http://localhost:3000/api/book', {
        method: 'POST',
        body: JSON.stringify({ bookName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('🎉The page has been created!');
      } else {
        alert(`😭Error : ${data.message}`);
      }
    } catch (error) {
      alert('😠Communication error occurs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='font-sans mb-4 space-y-3'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-600'>本の名前</label>
        <input
          type='text'
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          name='bookname'
          className='mt-1 p-2 w-full border rounded-md'
        />
      </div>
      <div className='mt-4'>
        <button
          type='submit'
          className='w-full px-4 py-3 text-white bg-blue-600 rounded-md transform hover:bg-blue-400 hover:scale-y-90 duration-0 font-bold'
        >
          Notionのページを作成する
        </button>
      </div>
    </form>
  );
};

export default BookTitleForm;
