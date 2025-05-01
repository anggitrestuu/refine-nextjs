// src/components/Chat/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message, AgentInfo } from './types';
import { useAgentStore } from '@/hooks/useAgentStore';
import { useWorkroomStore } from '@/hooks/useWorkroomStore';
import { initiateAgentChat, initiateWorkroomChat, createChatResponseEventSource, StreamChunk } from '@/services/chat-service';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedAgent } = useAgentStore();
    const { selectedWorkroom } = useWorkroomStore();
    const eventSourceRef = useRef<EventSource | null>(null);

    // Reset messages when agent or workroom changes
    useEffect(() => {
        if (selectedAgent) {
            setMessages([
                {
                    id: '1',
                    sender: 'ai',
                    text: `Hello! I'm ${selectedAgent.title}. How can I assist you today?`,
                    timestamp: new Date(),
                },
            ]);
        } else if (selectedWorkroom) {
            setMessages([
                {
                    id: '1',
                    sender: 'ai',
                    text: `Welcome to ${selectedWorkroom.title} workroom. How can I assist you today?`,
                    timestamp: new Date(),
                },
            ]);
        } else {
            setMessages([
                {
                    id: '1',
                    sender: 'ai',
                    text: 'Hello! How can I assist you today?',
                    timestamp: new Date(),
                },
            ]);
        }
    }, [selectedAgent, selectedWorkroom]);

    // Cleanup event source on unmount
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    const handleSend = async (text: string) => {
        if (!selectedAgent?.slug && !selectedWorkroom?.slug) {
            console.error("No agent or workroom selected");
            return;
        }

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);

        // Create placeholder for AI response
        const aiMsgId = (Date.now() + 1).toString();
        const aiMsg: Message = {
            id: aiMsgId,
            sender: 'ai',
            text: '',
            timestamp: new Date(),
            isStreaming: true,
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(true);

        try {
            // Initiate chat with the agent or workroom
            let chatResponse;
            if (selectedAgent?.slug) {
                chatResponse = await initiateAgentChat(selectedAgent.slug, text);
            } else if (selectedWorkroom?.slug) {
                chatResponse = await initiateWorkroomChat(selectedWorkroom.slug, text);
            } else {
                throw new Error("No agent or workroom selected");
            }

            // Close any existing event source
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }

            // Create a new event source for streaming the response
            eventSourceRef.current = createChatResponseEventSource(
                chatResponse.task_id,
                (chunk: StreamChunk) => {
                    // Handle incoming chunks
                    setMessages(prev => {
                        const updatedMessages = [...prev];
                        const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === aiMsgId);

                        if (aiMessageIndex !== -1) {
                            // Update the AI message with the new content
                            if (chunk.type === 'chunk') {
                                updatedMessages[aiMessageIndex].text += chunk.content;
                            } else if (chunk.type === 'final') {
                                updatedMessages[aiMessageIndex].text = chunk.content;
                                updatedMessages[aiMessageIndex].isStreaming = false;
                            } else if (chunk.type === 'error') {
                                updatedMessages[aiMessageIndex].text = 'Error: ' + chunk.content;
                                updatedMessages[aiMessageIndex].isStreaming = false;
                            }
                        }

                        return updatedMessages;
                    });
                },
                (error) => {
                    // Handle errors
                    console.error('Error in chat stream:', error);
                    setMessages(prev => {
                        const updatedMessages = [...prev];
                        const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === aiMsgId);

                        if (aiMessageIndex !== -1) {
                            updatedMessages[aiMessageIndex].text = 'Sorry, an error occurred while processing your request.';
                            updatedMessages[aiMessageIndex].isStreaming = false;
                        }

                        return updatedMessages;
                    });
                    setIsLoading(false);
                },
                () => {
                    // Handle completion
                    setIsLoading(false);
                }
            );
        } catch (error) {
            console.error('Error initiating chat:', error);
            setMessages(prev => {
                const updatedMessages = [...prev];
                const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === aiMsgId);

                if (aiMessageIndex !== -1) {
                    updatedMessages[aiMessageIndex].text = 'Sorry, an error occurred while connecting to the agent.';
                    updatedMessages[aiMessageIndex].isStreaming = false;
                }

                return updatedMessages;
            });
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: 'background.surface',
                borderRadius: 1,
                border: 1,
                borderColor: 'border.main',
            }}
        >
            <ChatHeader
                title={
                    selectedAgent
                        ? selectedAgent.title
                        : selectedWorkroom
                            ? selectedWorkroom.title
                            : "Default Chat"
                }
                subtitle={
                    selectedAgent
                        ? selectedAgent.description
                        : selectedWorkroom
                            ? selectedWorkroom.description
                            : "Standard chat interface with a general-purpose AI assistant."
                }
            />
            <MessageList messages={messages} />
            <ChatInput onSend={handleSend} disabled={isLoading} />
        </Box>
    );
};

export default ChatWindow;
