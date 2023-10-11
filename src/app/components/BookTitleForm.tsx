import React from 'react';

const BookTitleForm = () => {
  return (
    <form className='font-sans mb-4 space-y-3'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-600'>本の名前</label>
        <input type='text' name='bookname' className='mt-1 p-2 w-full border rounded-md' />
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
