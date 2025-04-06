import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

type Props = {
  chatId: string | null;
};

const chatWindowStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  padding: '1rem',
  overflow: 'hidden',
};

const messagesStyle = {
  flex: 1,
  overflowY: 'auto' as const,
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column' as const,
};

const ChatWindow = ({ chatId }: Props) => {
  if (!chatId) {
    return (
      <div
        style={{
          ...chatWindowStyle,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', color: '#888' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Welcome to Jenkins AI Assistant</h2>
          <p>Create a new chat or select a chat from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  const messages = [
    {
      role: 'user' as const,
      content: 'Hi! I need help creating a Jenkins pipeline for my Node.js project.',
    },
    {
      role: 'assistant' as const,
      content:
        "Of course! Here's a basic Jenkinsfile you can use for a Node.js project:\n\n```groovy\npipeline {\n  agent any\n  stages {\n    stage('Install') {\n      steps {\n        sh 'npm install'\n      }\n    }\n    stage('Test') {\n      steps {\n        sh 'npm test'\n      }\n    }\n  }\n}\n```",
    },
    {
      role: 'user' as const,
      content: 'Thanks! How can I run this pipeline automatically when I push to GitHub?',
    },
    {
      role: 'assistant' as const,
      content:
        "Great question! To trigger the pipeline on GitHub pushes, you can set up a webhook in your GitHub repository that points to your Jenkins server. You'll also need the GitHub plugin installed in Jenkins.\n\nWould you like a step-by-step guide?",
    },
    {
      role: 'user' as const,
      content: 'Yes, that would be helpful.',
    },
    {
      role: 'assistant' as const,
      content:
        "Sure! Here's a simplified guide:\n\n1. In Jenkins, go to Manage Jenkins > Configure System.\n2. Under GitHub, add your credentials.\n3. In your GitHub repo, go to Settings > Webhooks and add your Jenkins URL:\n```\nhttp://your-jenkins-server/github-webhook/\n```\n4. Make sure your Jenkins job is configured with 'GitHub hook trigger for GITScm polling'.\n\nLet me know if you want help configuring the job file.",
    },
  ];
  

  return (
    <div style={chatWindowStyle}>
      <div style={messagesStyle}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>
      <MessageInput chatId={chatId} />
    </div>
  );
};

export default ChatWindow;
