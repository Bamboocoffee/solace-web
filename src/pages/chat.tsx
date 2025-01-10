'use client'
import React, { useState, useEffect, useRef } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import './chat.css';
import { useGoogleAnalytics } from "../app/hooks/useGoogleAnalytics";
import { updateGoogleSheet } from '@/app/api/updateGoogleSheet';
import { openAICompletion } from '@/app/api/openAICompletion';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const Chat = () => { 
  const [messages, setMessages] = useState<Message[]>([]); // Initialize messages state
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false); // Loading state
  useGoogleAnalytics(); // Track page views


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

      // =========== Uncomment this to test the OpenAPI integrations ===========
      // const response = await openAICompletion(inputValue); // calls the LLM
      
      // const assistantResponse = { // constructs the reponse
      //   id: messages.length + 2, // Generate unique ID for each message
      //   content: response,
      //   isUser: false,
      // };
      // =========== Uncomment this to test the OpenAPI integrations ===========

      //  =========== Uncomment this to Production ===========
      let response = ""; 
      try {
        let apiResponse = await updateGoogleSheet(inputValue)
        response = "Sheet updated at: " + apiResponse.updatedRange
        console.log("Success")
      } catch (error) {
        let response = "Something went wrong: " + error;
      }

      setLoading(false); // Set loading to false
      const assistantResponse = { // constructs the reponse
        id: messages.length + 2, // Generate unique ID for each message
        content: response,
        isUser: false,
      };
      //  =========== Uncomment this to Production ===========

      setLoading(false); // Set loading to false
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