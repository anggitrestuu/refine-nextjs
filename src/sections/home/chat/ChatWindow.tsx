// src/components/Chat/ChatWindow.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from './types';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: 'Hello! How can I assist you today?sadasdasda asdhaskldjalskd ashdkasdhkajsdh asdhkasjdhakjshd ahsdjkahsd',
            timestamp: new Date(),
        },
        {
            id: '2',
            sender: 'user',
            text: 'Hi, I need help with my order.',
            timestamp: new Date(),
        },
    ]);

    const handleSend = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);

        // Simulasi AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: `Echo: ${text}`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 500);
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
                title="Default Chat"
                subtitle="Standard chat interface with a general-purpose AI assistant."
            />
            <MessageList messages={messages} />
            <ChatInput onSend={handleSend} />
        </Box>
    );
};

export default ChatWindow;
