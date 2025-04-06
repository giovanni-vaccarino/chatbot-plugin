import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../model/ChatbotFooter';

export const ChatbotFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
    };

    setMessages([...messages, newMessage]);

    // Simulated bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          sender: 'bot',
          text: `🤖 You said: "${input.trim()}"`,
        },
      ]);
    }, 600);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '3rem',
          right: '2rem',
          zIndex: 1000,
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          backgroundColor: '#0073e6',
          color: 'white',
          fontSize: '24px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '2rem',
            width: '360px',
            height: '480px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid #eee',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: '#f5f5f5',
            }}
          >
            Jenkins AI Assistant
          </div>

          <div
            style={{
              flex: 1,
              padding: '0.75rem',
              overflowY: 'auto',
              fontSize: '14px',
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  marginBottom: '0.5rem',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 0.75rem',
                    borderTopLeftRadius: msg.sender === 'user' ? 20 : 6,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: msg.sender === 'user' ? 6 : 20,
                    backgroundColor:
                      msg.sender === 'user' ? '#0073e6' : '#2d2d2d',
                    color: msg.sender === 'user' ? '#fff' : '#f0f0f0',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '0.75rem', borderTop: '1px solid #eee' }}>
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
