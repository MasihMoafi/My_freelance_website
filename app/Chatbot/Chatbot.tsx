'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage = inputText.trim();
      setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
      setInputText('');

      // Use the relative API endpoint on your Vercel deployment
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2', // Must match EXACT model name
          prompt: userMessage,
          stream: false
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Connection failed:', error);
      setMessages(prev => [...prev, { 
        text: "Check: 1) Ollama is running 2) Tunnel active", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // (Keep all styling and JSX exactly as before)
  const chatWindowStyle = { /* ... */ };
  const headerStyle = { /* ... */ };
  const titleStyle = { /* ... */ };
  const closeButtonStyle = { /* ... */ };
  const messageContainerStyle: React.CSSProperties = { /* ... */ };
  const messageBubbleStyle = (sender: 'user' | 'bot'): React.CSSProperties => ({ /* ... */ });
  const textStyle = (sender: 'user' | 'bot'): React.CSSProperties => ({ /* ... */ });
  const inputContainerStyle = { /* ... */ };
  const inputStyle = { /* ... */ };
  const sendButtonStyle = { /* ... */ };
  const toggleButtonStyle = { /* ... */ };
  const loadingStyle = { /* ... */ };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '29.6px', zIndex: 1000 }}>
      {isOpen && (
        <div style={chatWindowStyle}>
          <div style={headerStyle}>
            <div style={titleStyle}>AI Assistant</div>
            <button onClick={() => setIsOpen(false)} style={closeButtonStyle}>
              ×
            </button>
          </div>
          
          <div ref={chatContainerRef} style={messageContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={messageBubbleStyle(msg.sender)}>
                <span style={textStyle(msg.sender)}>
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={loadingStyle}>
                <div className="dot-flashing" />
              </div>
            )}
          </div>

          <div style={inputContainerStyle}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={inputStyle}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              style={sendButtonStyle}
              disabled={isLoading}
            >
              {isLoading ? '...' : '➤'}
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={toggleButtonStyle}
        >
          🤖
        </button>
      )}
    </div>
  );
}
