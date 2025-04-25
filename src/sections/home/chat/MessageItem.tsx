// src/components/Chat/MessageItem.tsx
import React from 'react';
import { Avatar, Box, Paper, Typography, alpha } from '@mui/material';
import { Message } from './types';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MarkdownMessage } from './MarkdownMessage';

interface MessageItemProps {
    message: Message;
}

const MessageAvatar: React.FC<{ isUser: boolean }> = ({ isUser }) => (
    <Avatar
        sx={{
            bgcolor: isUser ? 'primary.main' : 'secondary.main',
            width: 32,
            height: 32,
            [isUser ? 'ml' : 'mr']: 1,
            alignSelf: 'flex-end',
            mb: -2
        }}
    >
        {isUser ? (
            <AccountCircleIcon sx={{ fontSize: 20, color: "white" }} />
        ) : (
            <SmartToyIcon sx={{ fontSize: 20, color: "white" }} />
        )}
    </Avatar>
);

const MessageConnector: React.FC<{ isUser: boolean }> = ({ isUser }) => (
    <Box
        sx={{
            width: "20px",
            bgcolor: isUser ? "primary.main" : "secondary.main",
            borderRadius: isUser ? "0px 8px 0px 0px" : "8px 0px 0px 0px",
            [isUser ? 'ml' : 'mr']: -2,
            zIndex: 1
        }}
    />
);

const MessageBubble: React.FC<{ message: Message; isUser: boolean }> = ({ message, isUser }) => (
    <Paper
        elevation={1}
        sx={{
            p: 1.5,
            maxWidth: '85%', // Tambahkan maxWidth untuk membatasi lebar bubble
            bgcolor: "primary.lighter",
            borderRadius: isUser ? '8px 8px 0 8px' : '8px 8px 8px 0',
            borderColor: 'primary.main',
            zIndex: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden', // Tambahkan overflow hidden
            '& pre': {
                overflow: 'auto',
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
            },
            '& table': {
                display: 'block',
                overflow: 'auto',
                maxWidth: '100%',
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
            },
        }}
    >
        <MarkdownMessage content={message.text} />
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
);

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                mb: 2,
            }}
        >
            {!isUser && <MessageAvatar isUser={isUser} />}
            {!isUser && <MessageConnector isUser={isUser} />}
            <MessageBubble message={message} isUser={isUser} />
            {isUser && <MessageConnector isUser={isUser} />}
            {isUser && <MessageAvatar isUser={isUser} />}
        </Box>
    );
};

export default MessageItem;
