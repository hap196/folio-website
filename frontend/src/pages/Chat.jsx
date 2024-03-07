import React, { useState } from "react";
import MessageList from "./../components/chat/MessageList";
import ChatInput from "./../components/chat/ChatInput";
import Navbar from "./../components/Navbar";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    // call api to get respond and add it to the message list
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <div className="w-full">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};


export default ChatPage;
