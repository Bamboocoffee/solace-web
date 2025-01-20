'use client'
import React, { useState, useEffect, useRef } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import './chat.css';

// Hooks
import { useGoogleAnalytics } from "../app/hooks/useGoogleAnalytics";

// APIs
import { updateGoogleSheet } from '@/app/api/updateGoogleSheet';
import { openAICompletion } from '@/app/api/openAICompletion';
import { authenticate } from '@/app/api/authentication';

// Helpers
import { processMessage } from '@/app/helpers/processMessage';

interface Message {
  id: any;  
  content: any;
  processedContent: string | null;
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom when messages change
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Prevent form submission
    }
  };
  
  /**
   * Handles the logic for managing user and llm generated messages.
   * 
   */
  const handleSendMessage = async() => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1, // Generate unique ID for each message
        content: inputValue,
        processedContent: null,
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
      // try {
      //   const apiResponse = await authenticate();
      //   const assistantResponse: Message[] = await processMessage(apiResponse, messages.length + 2); // Split and process the response
      //   setMessages((prevMessages) => [...prevMessages, ...assistantResponse]);
      // } catch (error) {
      //   const errorResponse: Message = {
      //     id: messages.length + 2,
      //     content: `Something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}`,
      //     processedContent: null,
      //     isUser: false,
      //   };
      //   setMessages((prevMessages) => [...prevMessages, errorResponse]);
      // }
      //  =========== Uncomment this to Production ===========

      //
      const response = "Still learning..."; // calls the LLM
      
      const assistantResponse = { // constructs the reponse
        id: messages.length + 2, // Generate unique ID for each message
        content: response,
        processedContent: null,
        isUser: false,
      };
        setMessages((prevMessages) => [...prevMessages, assistantResponse]);


      setLoading(false); // Set loading to false
      setInputValue(''); // Clear input field
    }
  };

  /**
   * This function is a worker that correctly formats the stored message as per our desired UX
   * @param param0 
   * @returns 
   */
  const Message = ({ message }: { message: Message }) => {
    return (
      <div
      className={`message-container ${message.isUser ? 'user-message-container' : ''}`}
    >
      <div className={`message ${message.isUser ? 'user-message' : 'assistant-message'}`}>
        {message.processedContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: message.processedContent }}
          ></div>
        ) : (
          message.content
        )}
      </div>
      </div>
    )
  };

  return (
    <div className="chat-container">
      <div className="chat-header">You're chatting with "Stephen"</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
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