'use client';
import React, { useState } from 'react';
import '../app/globals.css';
import './chat.css';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const ChatUI: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        id: messages.length,
        content: inputValue,
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      // Perform any necessary processing or API calls here
      // to get the response from the ChatGPT model
      // and add it to the messages array.
    }
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }

  return (
    (
      <div className="h-screen flex items-center justify-center bg-gray-200">
        <div className="w-96 pt-48 flex flex-col bg-slate-100 rounded-lg shadow-lg">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 mb-2 rounded ${
                  message.isUser ? 'bg-white text-black self-end' : 'bg-gray-200 self-start'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex items-center p-4 bg-gray-100 rounded-b-lg">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 ml-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  )
              };

export default ChatUI;
