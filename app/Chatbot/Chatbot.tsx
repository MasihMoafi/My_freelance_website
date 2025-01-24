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

      // Directly call Ollama API via local tunnel
      const response = await fetch('https://joe-ollama.loca.lt/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('username:password') // Add your auth
        },
        body: JSON.stringify({
          model: 'llama3',
          prompt: userMessage,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 500
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
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

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '29.6px', zIndex: 1000 }}>
      {isOpen && (
        <div style={chatWindowStyle}>
          <div style={headerStyle}>
            <div style={titleStyle}>Chat with Joe's AI</div>
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
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              style={sendButtonStyle}
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={toggleButtonStyle}
        >
          💬
        </button>
      )}
    </div>
  );
}

// Style constants
const chatWindowStyle = {
  width: '350px',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
};

const closeButtonStyle = {
  padding: '8px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#31616c',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const messageContainerStyle = {
  height: '330px',
  overflowY: 'auto',
  marginBottom: '16px',
  padding: '8px',
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
};

const messageBubbleStyle = (sender: 'user' | 'bot') => ({
  textAlign: sender === 'user' ? 'right' : 'left',
  margin: '8px 0',
});

const textStyle = (sender: 'user' | 'bot') => ({
  display: 'inline-block',
  padding: '8px 12px',
  borderRadius: '12px',
  backgroundColor: sender === 'user' ? '#31616c' : '#e5e7eb',
  color: sender === 'user' ? '#fff' : '#1f2937',
  maxWidth: '80%',
  wordWrap: 'break-word' as const,
});

const inputContainerStyle = {
  display: 'flex',
  gap: '8px',
};

const inputStyle = {
  flex: 1,
  padding: '8px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  backgroundColor: '#ffffff',
  color: '#1f2937',
  outline: 'none',
};

const sendButtonStyle = {
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#31616c',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
};

const toggleButtonStyle = {
  padding: '12px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#31616c',
  color: '#fff',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '8px',
};
