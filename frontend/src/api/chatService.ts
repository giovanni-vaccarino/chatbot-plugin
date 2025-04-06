import { ChatResponse } from "../model/ChatResponse";
import { API_BASE } from "../config";

/**
 * Starts a new chat session.
 * @returns session ID string
 */
export const startSession = async (): Promise<string> => {
  const res = await fetch(`${API_BASE}/start-session`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to start chat session');
  }

  const data = await res.json();
  return data.session_id;
};
  
/**
 * Sends a user message to the backend and receives a reply.
 * @param message - user message
 * @param sessionId - active chat session ID
 * @returns the assistant’s reply and optional sources
 */
export const sendMessage = async (
  message: string,
  sessionId: string
): Promise<ChatResponse> => {
  const res = await fetch(`${API_BASE}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Backend error: ${errorText}`);
  }

  return await res.json();
};

/**
 * Deletes the current chat session.
 * @param sessionId - session to delete
 */
export const deleteSession = async (sessionId: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/delete-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete session: ${errorText}`);
  }
};