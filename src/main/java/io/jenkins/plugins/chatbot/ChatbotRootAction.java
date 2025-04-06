package io.jenkins.plugins.chatbot;

import hudson.Extension;
import hudson.model.RootAction;

@Extension
public class ChatbotRootAction implements RootAction {
    @Override
    public String getIconFileName() {
        return "/plugin/chatbot-plugin/images/chatbot-icon.png";
    }

    @Override
    public String getDisplayName() {
        return "Jenkins AI Assisant";
    }

    @Override
    public String getUrlName() {
        return "chatbot";
    }
}
