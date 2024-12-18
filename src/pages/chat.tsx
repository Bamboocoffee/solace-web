'use client'
import React, { useState, useEffect, useRef } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import './chat.css';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const callExternalApi = async (param1: string) => {
  try {
    // Build the URL with query parameters
    const url = `http://127.0.0.1:5000/completion/?param1=${encodeURIComponent(param1)}`;
    const res = await fetch(url, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return(data.response);
  } catch (error) {
    console.error('Error calling external API:', error);
    return('Error occurred');
  }
};

const Chat = () => { 
  const [messages, setMessages] = useState<Message[]>([]); // Initialize messages state
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update input value on change
  };

  const handleSendMessage = async() => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1, // Generate unique ID for each message
        content: inputValue,
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Add user message to messages state

      setLoading(true); // Set loading to true
      const response = await callExternalApi(inputValue); // calls the LLM
      setLoading(false); // Set loading to false
      
      // const assistantResponse = { // constructs the reponse
      //   id: messages.length + 2, // Generate unique ID for each message
      //   content: response,
      //   isUser: false,
      // };

      const assistantResponse = { // constructs the reponse
        id: messages.length + 2, // Generate unique ID for each message
        content: "Currently training on Stephen's life.",
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, assistantResponse]); // Add assistant message to messages state
      setInputValue(''); // Clear input field
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom when messages change
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Prevent form submission
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">You're chatting with "Stephen"</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-container ${message.isUser ? 'user-message-container' : ''}`}
          >
            <div className={`message ${message.isUser ? 'user-message' : 'assistant-message'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="loading-container">
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Chat
        </button>
      </div>
    </div>
  );
};

export default Chat;