import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col items-center overflow-y-auto">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default MessageList;
