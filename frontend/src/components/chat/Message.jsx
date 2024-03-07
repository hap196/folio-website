import React from 'react';

const Message = ({ text, sender }) => {
  const messageClass = sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start';

  return (
    <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 my-2 rounded ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
