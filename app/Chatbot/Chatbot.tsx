'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import React from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  image?: string;
};

type SearchResult = {
  title: string;
  snippet: string;
  link: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fix hydration issue by moving browser-specific code to useEffect
  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        setVoices(availableVoices);
      };
      
      // Try loading voices immediately
      loadVoices();
      
      // Some browsers need this event to get voices
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
      
      // Cleanup
      return () => {
        if (synthRef.current) {
          synthRef.current.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Enhanced speak function using Python-based TTS
  const speak = async (text: string) => {
    try {
      setIsSpeaking(true);
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) throw new Error('TTS failed');
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      await new Promise((resolve) => {
        audio.onended = resolve;
        audio.onerror = resolve;
        audio.play().catch(resolve);
      });
      
      URL.revokeObjectURL(audioUrl);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  // Simplified approach using just browser's MediaRecorder
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", async () => {
        setIsRecording(false);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        // Create audio blob and send for transcription
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob);
        
        try {
          setIsLoading(true);
          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) throw new Error('Transcription failed');
          
          const data = await response.json();
          const transcribedText = data.text || "Sorry, I couldn't understand that.";
          
          setMessages(prev => [...prev, { text: transcribedText, sender: 'user' }]);
          
          // Process the transcribed message
          if (isSearchMode) {
            handleSearch(transcribedText);
          } else {
            handleSendMessage(transcribedText);
          }
        } catch (error: any) {
          console.error('Transcription error:', error);
          setMessages(prev => [...prev, { 
            text: "Voice transcription failed. Please try typing instead.", 
            sender: 'bot' 
          }]);
        } finally {
          setIsLoading(false);
        }
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error('Microphone error:', error);
      setIsRecording(false);
      setMessages(prev => [...prev, { 
        text: "Microphone access failed. Try Chrome or Firefox.", 
        sender: 'bot' 
      }]);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  // Update handleSendMessage to include TTS
  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage = messageText.trim();
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

  // Handle image upload
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      // Direct call to Landing AI API
      const response = await fetch("https://api.va.landing.ai/v1/tools/agentic-document-analysis", {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YWdmbjl0d200emV3cjVicHFzeXpuOmFBWGJCTGZRUFBsMzZVVWF3aXFVYVduY0hGVUdIQmhq'
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Image analysis failed');
      
      const data = await response.json();
      const extractedText = data.data?.markdown || "No text extracted from image";
      
      setMessages(prev => [...prev, {
        text: extractedText,
        sender: 'bot',
        image: URL.createObjectURL(file)
      }]);
      
      speak(extractedText);
    } catch (error: any) {
      console.error('Image analysis error:', error);
      setMessages(prev => [...prev, {
        text: `Error analyzing image: ${error.message}`,
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle search
  const handleSearch = async (text?: string) => {
    const searchQuery = text || inputText;
    if (!searchQuery.trim() || isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Add user message
      setMessages(prev => [...prev, { text: searchQuery, sender: 'user' }]);
      setInputText('');
      
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      // Format search results as markdown
      let markdownResults = `## Search Results for "${searchQuery}"\n\n`;
      
      if (data.results && data.results.length > 0) {
        data.results.forEach((result: SearchResult, index: number) => {
          markdownResults += `### ${result.title}\n`;
          markdownResults += `${result.snippet}\n`;
          markdownResults += `[Read more](${result.link})\n\n`;
        });
      } else {
        markdownResults += "No results found.";
      }
      
      // Add summary if available
      if (data.summary) {
        markdownResults += `\n## Summary\n\n${data.summary}`;
      }
      
      setMessages(prev => [...prev, { text: markdownResults, sender: 'bot' }]);
      speak(data.summary || "Here are your search results.");
    } catch (error: any) {
      console.error('Search error:', error);
      setMessages(prev => [...prev, { 
        text: `Error performing search: ${error.message}`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle search mode
  const toggleSearchMode = () => {
    setIsSearchMode(!isSearchMode);
  };

  // Auto-scroll messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Styles
  const chatWindowStyle: React.CSSProperties = {
    width: '400px', // Increased from 350px
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
  };

  const closeButtonStyle: React.CSSProperties = {
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

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    flexDirection: 'column', // Changed to column layout
  };

  const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-start',
  };

  const inputRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
  };

  const inputStyle: React.CSSProperties = {
    flex: '1',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#31616c',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
  };

  const toggleButtonStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#31616c',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '20px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modeIndicatorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: isSearchMode ? '#4CAF50' : '#31616c',
    textAlign: 'center',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen ? (
        <div style={chatWindowStyle}>
          <div style={headerStyle}>
            <div style={titleStyle}>AI Assistant</div>
            <button onClick={() => setIsOpen(false)} style={closeButtonStyle}>×</button>
          </div>

          <div style={modeIndicatorStyle}>
            {isSearchMode ? '🔍 Search Mode' : '💬 Chat Mode'}
          </div>

          <div ref={chatContainerRef} style={messageContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={messageBubbleStyle(msg.sender)}>
                {msg.image && (
                  <img 
                    src={msg.image} 
                    alt="Uploaded" 
                    style={{ 
                      maxWidth: '200px', 
                      borderRadius: '8px', 
                      marginBottom: '8px',
                      display: 'block',
                      marginLeft: msg.sender === 'user' ? 'auto' : '0',
                      marginRight: msg.sender === 'user' ? '0' : 'auto',
                    }} 
                  />
                )}
                <div style={textStyle(msg.sender)}>
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {(isLoading || isSpeaking) && (
              <div style={{ 
                textAlign: 'center', 
                padding: '8px', 
                color: '#31616c',
                fontStyle: 'italic'
              }}>
                {isSpeaking ? '🔊 Speaking...' : '⏳ Processing...'}
              </div>
            )}
          </div>

          <div style={inputContainerStyle}>
            <div style={buttonRowStyle}>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                style={{
                  ...buttonStyle,
                  backgroundColor: isRecording ? '#ff4444' : '#31616c'
                }}
                disabled={isLoading}
                title={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? '⏹️' : '🎤'}
              </button>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                style={buttonStyle}
                disabled={isLoading}
                title="Upload image"
              >
                📷
              </button>
              
              <button
                onClick={toggleSearchMode}
                style={{
                  ...buttonStyle,
                  backgroundColor: isSearchMode ? '#4CAF50' : '#31616c'
                }}
                disabled={isLoading}
                title={isSearchMode ? "Switch to chat mode" : "Switch to search mode"}
              >
                {isSearchMode ? '💬' : '🔍'}
              </button>
            </div>
            
            <div style={inputRowStyle}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    isSearchMode ? handleSearch() : handleSendMessage();
                  }
                }}
                style={inputStyle}
                placeholder={isSearchMode ? "Search for something..." : "Type your message..."}
                disabled={isLoading || isRecording}
              />
              
              <button
                onClick={() => isSearchMode ? handleSearch() : handleSendMessage()}
                style={{
                  ...buttonStyle,
                  backgroundColor: isSearchMode ? '#4CAF50' : '#31616c'
                }}
                disabled={isLoading || isSpeaking || (!inputText.trim() && !isRecording)}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} style={toggleButtonStyle}>
          🤖
        </button>
      )}
    </div>
  );
}
