import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const containerStyle = {
  display: 'flex',
  height: '100vh',
  fontFamily: 'sans-serif',
  margin: 0,
  padding: 0,
  backgroundColor: '#fff',
};

export const ChatbotPage = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <div style={containerStyle}>
      <ChatSidebar activeChatId={activeChatId} onSelectChat={setActiveChatId} />
      <ChatWindow chatId={activeChatId} />
    </div>
  );
};
