'use client'; // Mark this as a client component

import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]); // Store chat messages
  const [inputText, setInputText] = useState(''); // Store user input
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      // Add the user's message to the chat
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText(''); // Clear the input field

      // Call the API route to get the bot's response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const botResponse = data.response;

      // Add the bot's response to the chat
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '29.6px', zIndex: 1000 }}>
      {isOpen && (
        <div
          style={{
            width: '350px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            backgroundColor: '#ffffff', // Solid white background for the chat window
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Chat with Masih!</div>
            <button
              onClick={() => setIsOpen(false)} // Close the chat window
              style={{
                padding: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#31616c', // Use #31616c for the close button
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
          <div
            ref={chatContainerRef}
            style={{
              height: '330px',
              overflowY: 'auto',
              marginBottom: '16px',
              padding: '8px',
              backgroundColor: '#f3f4f6', // Solid gray background for the chat section
              borderRadius: '8px',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  margin: '8px 0',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: msg.sender === 'user' ? '#31616c' : '#e5e7eb',
                    color: msg.sender === 'user' ? '#fff' : '#1f2937',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                outline: 'none',
              }}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#31616c', // Use #31616c for the send button
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {!isOpen && ( // Only show the chatbot button when the chat window is closed
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '12px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#31616c', // Use #31616c for the chatbot button
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px', // Restore the original size
            height: '48px', // Restore the original size
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}