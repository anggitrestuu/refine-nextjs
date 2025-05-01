// src/components/Chat/ChatInput.tsx
import React, { useState } from 'react';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setText('');
    };

    const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
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
                borderColor: 'border.main',
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
                disabled={disabled}
                InputProps={{
                    sx: {
                        borderRadius: 1.5,
                        bgcolor: disabled ? 'action.disabledBackground' : 'background.surface',
                        borderColor: 'border.main'
                    }
                }}
            />
            <IconButton
                type="submit"
                sx={{ ml: 1 }}
                color="primary"
                disabled={disabled || !text.trim()}
            >
                {disabled ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
        </Box>
    );
};

export default ChatInput;
