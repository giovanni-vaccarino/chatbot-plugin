package io.jenkins.plugins.chatbot;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.http.*;
import java.net.URI;
import org.json.*;
import io.jenkins.plugins.chatbot.ChatSessionManager;
import io.jenkins.plugins.chatbot.model.ChatRequest;
import io.jenkins.plugins.chatbot.model.ChatResponse;

/**
 * REST API layer for the AI-powered chatbot plugin.
 * This class exposes endpoints to manage chatbot sessions and handle user requests,
 * acting as a bridge between the Jenkins frontend and the Python AI backend.
 */
@Path("/chatbot/api")
public class ChatbotAPI {

    /**
     * Starts a new chat session.
     * This initializes a session on the Python backend and returns a session ID
     * that will be used for all future interactions in the conversation. The
     * chat session ID is saved in the ChatSessionManager.
     *
     * @return HTTP 200 with JSON response containing the session_id
     *      or HTTP 409 if chat session limit is reached
     *      or HTTP 500 if the request fails 
     */
    @POST
    @Path("/start-session")
    @Produces(MediaType.APPLICATION_JSON)
    public Response startChatSession() {
        try {
            if (!ChatSessionManager.canStartNewSession()) {
                return Response.status(409).entity("Too many active sessions").build();
            }

            // TODO fix hardcoded port -> get it as a sort of env variable
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8000/start-session"))
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            String sessionId = json.getString("session_id");

            ChatSessionManager.addSession(sessionId);

            return Response.ok(new JSONObject().put("session_id", sessionId).toString()).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to start a new chat session").build();
        }
    }

    /**
     * Sends a message from the user and forwards it to the Python AI backend.
     * Ensures the session is active and not currently waiting for another response.
     * The Pyhton backend will use the session ID to retrieve context and return a response.
     *
     * @param request of type ChatRequest -> The user's message and session ID
     * @return HTTP 200 with JSON containing the AI-generated reply
     *      or HTTP 404 if the session ID is not found
     *      or HTTP 409 if a response is already being processed for the session
     *      or HTTP 500 if the request fails
     */
    @POST
    @Path("/message")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response handleMessage(ChatRequest request) {
        try {
            if (!ChatSessionManager.hasSession(request.chatSessionId)) {
                return Response.status(404).entity("Session not found").build();
            }
            if (ChatSessionManager.isWaiting(request.chatSessionId)) {
                return Response.status(409).entity("Already waiting for response").build();
            }
            ChatSessionManager.setWaiting(request.chatSessionId, true);

            String jsonPayload = new JSONObject()
                .put("message", request.message)
                .put("session_id", request.chatSessionId)
                .toString();

            // TODO fix hardcoded port -> get it as a sort of env variable
            HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8000/generate"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> httpResponse = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            ChatSessionManager.setWaiting(request.chatSessionId, false);

            JSONObject json = new JSONObject(httpResponse.body());

            ChatResponse res = new ChatResponse();
            res.response = json.getString("reply");
            JSONArray sources = json.getJSONArray("sources");
            for (int i = 0; i < sources.length(); i++) {
                res.sources.add(sources.getString(i));
            }

            return Response.ok(res).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("AI backend error").build();
        }
    }

    /**
     * Deletes an existing chatbot session on the Python backend, clearing its context.
     * It also removes the session from the ChatSessionManager.
     *
     * @param sessionIdJson JSON containing the session_id to delete
     * @return HTTP 200 if deletion was successful
     *      or HTTP 404 if the session ID does not exist
     *      or HTTP 500 if the request fails
     */
    @POST
    @Path("/delete-session")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteSession(String sessionIdJson) {
        try {
            if (!ChatSessionManager.hasSession(sessionIdJson)) {
                return Response.status(404).entity("Chat Session not found").build();
            }
            // TODO fix hardcoded port -> get it as a sort of env variable
            HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8000/delete-session"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(sessionIdJson))
                .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> httpResponse = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            
            ChatSessionManager.removeSession(sessionIdJson);

            return Response.ok(httpResponse.body()).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to delete session").build();
        }
    }
}
