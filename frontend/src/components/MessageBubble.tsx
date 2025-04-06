type Props = {
  role: 'user' | 'assistant';
  content: string;
};

const MessageBubble = ({ role, content }: Props) => {
  const isUser = role === 'user';

  const bubbleStyle: React.CSSProperties = {
      backgroundColor: isUser ? '#007bff' : '#2d2d2d',
      color: isUser ? '#fff' : '#f0f0f0',
      padding: '10px 14px',
      fontSize: '0.95rem',
      maxWidth: '65%',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.4',
  
      borderTopLeftRadius: isUser ? 20 : 6,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: isUser ? 6 : 20,
    };
  
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          marginBottom: '8px',
        }}
      >
        <div style={bubbleStyle}>{content}</div>
      </div>
    );
};

export default MessageBubble;
