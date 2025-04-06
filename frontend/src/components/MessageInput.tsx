import { useState } from 'react';

type Props = {
  chatId: string;
};

const MessageInput = ({ chatId }: Props) => {
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (!text.trim()) return;
    console.log(`[SEND to ${chatId}]: ${text}`);
    setText('');
  };

  return (
    <div
      style={{
        borderTop: '1px solid #ccc',
        width: '100%',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '12px 16px',
          boxSizing: 'border-box',
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px 12px',
            fontSize: '1rem',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
            border: '1px solid #ccc',
            borderRight: 'none',
            outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 16px',
            fontSize: '1rem',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            border: '1px solid #007bff',
            borderLeft: 'none',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
