import React, { useState } from 'react';
import '../app/globals.css'

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

  return (
    <div className="h-screen flex items-center justify-centers flex-col bg-gray-200">
      <div className="h-screen flex w-4/12 pt-10 pb-32 flex-col bg-slate-100">
        <div className="flex-grow p-0 overflow-y-auto">
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
        <div className="flex items-center p-2 rounded-xl bg-gray-100">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-4 border text-black border-gray-300 rounded mr-4"
          />
          <button
            onClick={handleSendMessage}
            className="px-10 p-4 bg-gray-500 text-white rounded cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
