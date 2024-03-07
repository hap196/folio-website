import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';  

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-end h-full">
      <form onSubmit={handleSubmit} className="flex px-4 py-10 w-full max-w-xl">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-l-lg p-2 border border-gray-300" 
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg flex items-center justify-center"> {/* Adjusted button styling */}
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
