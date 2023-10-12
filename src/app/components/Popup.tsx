import React from 'react';

const Popup: React.FC<PopupProps> = ({ message, type, onClose }) => {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 '
      onClick={onClose}
    >
      <div
        className='relative bg-white p-6 rounded-lg shadow-lg z-10 w-full ml-4 mr-4 max-w-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col justify-between items-center'>
          <div className={`text-xl mb-4 ${type === 'success' ? 'text-gray-700' : 'text-red-600'}`}>
            {message}
          </div>
          <button
            type='submit'
            className='w-full px-4 py-3 text-white bg-blue-600 rounded-md transform hover:bg-blue-400 hover:scale-y-90 duration-0 font-bold'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
