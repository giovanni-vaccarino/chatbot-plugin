import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChatbotPage } from './components/ChatbotPage.tsx';
import { ChatbotFooter } from './components/ChatbotFooter.tsx';
import './index.css';

const pageRoot = document.getElementById('root');
const footerRoot = document.getElementById('chatbot-root');


if (pageRoot) {
  createRoot(pageRoot).render(
    <StrictMode>
      <ChatbotPage />
    </StrictMode>
  );
} else if (footerRoot) {
  createRoot(footerRoot).render(
    <StrictMode>
      <ChatbotFooter />
    </StrictMode>
  );
}
