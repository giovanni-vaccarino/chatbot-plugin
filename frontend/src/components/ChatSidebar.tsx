type Props = {
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
};

const sidebarStyle = {
  width: '260px',
  backgroundColor: '#2d2d2d',
  padding: '1rem',
  borderRight: '1px solid #444',
  color: '#f0f0f0',
};

const newChatButtonStyle = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  marginBottom: '1rem',
  cursor: 'pointer',
};

const longDividerStyle = {
  height: '1px',
  backgroundColor: '#888',
  margin: '1rem 0',
};

const chatItemStyle = (active: boolean) => ({
  padding: '8px 12px',
  borderRadius: '6px',
  marginBottom: '0.5rem',
  backgroundColor: active ? 'transparent' : 'transparent',
  color: active ? '#f2f1ed' : '#ccc',
  fontWeight: active ? 'bold' : 'normal',
  cursor: 'pointer',
});

const ChatSidebar = ({ activeChatId, onSelectChat }: Props) => {
  const dummyChats = [
    { id: '1', title: 'Pipeline help' },
    { id: '2', title: 'Docker build issue' },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img
          src="jenkins.png"
          alt="Jenkins Logo"
          style={{ height: '48px', marginBottom: '0.5rem' }}
        />
        <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>
          Jenkins AI Assistant
        </div>
      </div>
      <button style={newChatButtonStyle}>+ New Chat</button>

      <div style={longDividerStyle} />

      {dummyChats.map((chat) => (
        <div key={chat.id}>
          <div
            style={chatItemStyle(chat.id === activeChatId)}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
          </div>
        
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
