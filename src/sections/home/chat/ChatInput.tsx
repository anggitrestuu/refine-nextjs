// src/components/Chat/ChatInput.tsx
import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
    onSend: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText('');
    };

    const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box
            component="form"
            onSubmit={e => {
                e.preventDefault();
                handleSend();
            }}
            sx={{
                borderTop: 1,
                borderColor: 'divider',
                p: 1,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <TextField
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder="Ask me anything..."
                multiline
                maxRows={4}
                variant="outlined"
                fullWidth
                InputProps={{ sx: { borderRadius: 1.5, bgcolor: 'background.paper' } }}
            />
            <IconButton type="submit" sx={{ ml: 1 }} color="primary">
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default ChatInput;
