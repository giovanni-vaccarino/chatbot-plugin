package io.jenkins.plugins.chatbot;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import io.jenkins.plugins.chatbot.model.ChatSessionState;

/**
 * Manages the active chat sessions.
 */
public class ChatSessionManager {
    /**
     * The maximum number of active chatbot sessions allowed at any time.
     */
    private static final int MAX_ACTIVE_SESSIONS = 10;

    private static final Map<String, ChatSessionState> sessions = new ConcurrentHashMap<>();

    public static boolean canStartNewSession() {
        return sessions.size() < MAX_ACTIVE_SESSIONS;
    }

    public static void addSession(String sessionId) {
        sessions.put(sessionId, new ChatSessionState());
    }

    public static boolean hasSession(String sessionId) {
        return sessions.containsKey(sessionId);
    }

    public static void removeSession(String sessionId) {
        sessions.remove(sessionId);
    }

    public static boolean isWaiting(String sessionId) {
        return sessions.containsKey(sessionId) && sessions.get(sessionId).isPendingReply;
    }

    public static void setWaiting(String sessionId, boolean waiting) {
        if (sessions.containsKey(sessionId)) {
            sessions.get(sessionId).isPendingReply = waiting;
        }
    }
}
