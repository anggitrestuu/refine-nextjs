// src/components/Chat/ChatHeader.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface ChatHeaderProps {
    title: string;
    subtitle?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, subtitle }) => (
    <Box
        sx={{
            borderBottom: 1,
            borderColor: 'divider',
            p: 2,
        }}
    >
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && (
            <Typography variant="body2" color="text.secondary">
                {subtitle}
            </Typography>
        )}
    </Box>
);

export default ChatHeader;
