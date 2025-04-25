// src/components/Chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { Box, alpha, useTheme } from '@mui/material';
import MessageItem from './MessageItem';
import { Message } from './types';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const theme = useTheme();
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
                '&::-webkit-scrollbar': {
                    width: '6px',
                    height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.mode === 'light' ? 0.2 : 0.3
                        ),
                    borderRadius: '6px',
                    '&:hover': {
                        background: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.mode === 'light' ? 0.3 : 0.4
                            ),
                    },
                },
            }}
        >
            {messages.map(msg => (
                <MessageItem key={msg.id} message={msg} />
            ))}
        </Box>
    );
};

export default MessageList;
