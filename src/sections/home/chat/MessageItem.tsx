// src/components/Chat/MessageItem.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Message } from './types';

interface MessageItemProps {
    message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                mb: 1,
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: isUser ? 'success.light' : 'grey.200',
                }}
            >
                <Typography variant="body1">{message.text}</Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', textAlign: 'right' }}
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Typography>
            </Paper>
        </Box>
    );
};

export default MessageItem;
