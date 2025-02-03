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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Speak bot messages
  const speak = (text: string) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select the best available voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang === 'en-US' && v.name.includes('Google')
    ) || voices.find(v => v.default);
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.rate = 1.0; // Normal speed
      utterance.pitch = 1.0; // Normal pitch
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage = inputText.trim();
      setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
      setInputText('');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      const botMessage: Message = { text: data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      speak(botMessage.text);
    } catch (error: any) {
      console.error('Connection failed:', error);
      setMessages(prev => [...prev, { 
        text: `Error: ${error.message} - Verify the API is running properly`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => synthRef.current?.cancel();
  }, []);

  // Styles
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

  const messageContainerStyle: React.CSSProperties = {
    height: '300px',
    overflowY: 'auto',
    marginBottom: '16px',
    padding: '8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
  };

  const messageBubbleStyle = (sender: 'user' | 'bot'): React.CSSProperties => ({
    textAlign: sender === 'user' ? 'right' : 'left',
    margin: '8px 0',
  });

  const textStyle = (sender: 'user' | 'bot'): React.CSSProperties => ({
    display: 'inline-block',
    padding: '8px 12px',
    borderRadius: '12px',
    backgroundColor: sender === 'user' ? '#31616c' : '#e5e7eb',
    color: sender === 'user' ? '#fff' : '#1f2937',
    maxWidth: '80%',
    wordWrap: 'break-word',
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

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '29.6px', zIndex: 1000 }}>
      {isOpen ? (
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
            {(isLoading || isSpeaking) && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '8px',
                color: '#31616c'
              }}>
                {isSpeaking ? '🔊 Speaking...' : 'Processing...'}
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
              disabled={isLoading || isSpeaking}
            >
              {isLoading ? '...' : '➤'}
            </button>
          </div>
        </div>
      ) : (
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
