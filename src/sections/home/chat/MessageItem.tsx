// src/components/Chat/MessageItem.tsx
import React from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { Message } from './types';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface MessageItemProps {
    message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    mb: 1,
                }}
            >
                {!isUser && (
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.main',
                            width: 32,
                            height: 32,
                            mr: 1,
                            alignSelf: 'flex-end',
                            mb: -2
                        }}
                    >
                        <SmartToyIcon sx={{ fontSize: 20, color: "white" }} />
                    </Avatar>
                )}
                {
                    !isUser && (
                        <Box
                            sx={{
                                width: "20px",
                                bgcolor: "secondary.main",
                                borderRadius: "8px 0px 0px 0px",
                                mr: -2
                            }}
                        />
                    )
                }
                <Paper
                    elevation={1}
                    sx={{
                        p: 1.5,
                        maxWidth: '70%',
                        bgcolor: "primary.lighter",
                        borderRadius: isUser ? '8px 8px 0 8px' : '8px 8px 8px 0',
                        borderColor: 'primary.main',
                        zIndex: 2,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="body2">{message.text}</Typography>
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
                {
                    isUser && (
                        <Box
                            sx={{
                                width: "20px",
                                bgcolor: "primary.main",
                                borderRadius: "0px 8px 0px 0px",
                                ml: -2,
                                zIndex: 1
                            }}
                        />
                    )
                }
                {isUser && (
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 32,
                            height: 32,
                            ml: 1,
                            alignSelf: 'flex-end',
                            mb: -2
                        }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 20, color: "white" }} />
                    </Avatar>
                )}
            </Box>
        </>
    );
};

export default MessageItem;
