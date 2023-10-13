import React, { useState } from 'react';
import Popup from '../components/Popup';

const BookTitleForm = () => {
  const [bookName, setBookName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const bookName = formData.get('bookname');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        body: JSON.stringify({ bookName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPopupType('success');
        setPopupMessage('🎉The page has been created!');
        setShowPopup(true);
      } else {
        setPopupType('error');
        setPopupMessage(`😭Error: ${data.message}`);
        setShowPopup(true);
      }
    } catch (error) {
      setPopupType('error');
      setPopupMessage('😠Communication error occurs');
      setShowPopup(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='font-sans mb-4 space-y-3'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600'>Book Name</label>
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
            Create a Notion page!
          </button>
        </div>
      </form>
      {/* Popupの表示 */}
      {showPopup && (
        <Popup message={popupMessage} type={popupType} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default BookTitleForm;
