// src/components/Chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import MessageItem from './MessageItem';
import { Message } from './types';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        const el = containerRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages]);

    return (
        <Box
            ref={containerRef}
            sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 2,
                bgcolor: 'transparent',
            }}
        >
            {messages.map(msg => (
                <MessageItem key={msg.id} message={msg} />
            ))}
        </Box>
    );
};

export default MessageList;
