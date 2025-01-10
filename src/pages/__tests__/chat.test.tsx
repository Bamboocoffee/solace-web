import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '../chat';

describe('Chat Component', () => {
  test('renders chat header', () => {
    render(<Chat />);
    expect(screen.getByText("You're chatting with \"Stephen\"")).toBeInTheDocument();
  });

  test('allows user to type and send a message', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Chat');

    fireEvent.change(input, { target: { value: 'Hello, Stephen!' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello, Stephen!')).toBeInTheDocument();
    });
  });

  // ... other tests as in the previous example ...
});