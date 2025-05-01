// src/features/agent/components/AgentCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, Button } from '@mui/material';
import { IAgent } from './type';
import ChatIcon from '@mui/icons-material/Chat';
import { useAgentStore } from '@/hooks/useAgentStore';

interface AgentCardProps {
    agent: IAgent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
    const { selectAgent } = useAgentStore();

    const handleChatClick = () => {
        // Select this agent in the store
        selectAgent(agent);

        // Scroll to the chat window if needed
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Card variant="outlined" sx={{
            bgcolor: "background.surface",
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                transform: 'translateY(-4px)',
            }
        }}>
            <CardContent sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                minHeight: 200
            }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h6" fontWeight={'600'}>
                        {agent.title}
                    </Typography>

                    {/* visibility */}
                    <Chip
                        label={agent.list_type}
                        size="small"
                        sx={{
                            textTransform: 'capitalize',
                            bgcolor: 'secondary.main',
                            color: 'white',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            px: 1,
                            fontWeight: 'bold'
                        }}
                    />
                </Stack>

                <Box sx={{ flex: 1 }}>
                    {agent.description && (
                        <Typography
                            variant="body1"
                            fontWeight={'500'}
                            color='text.secondary'
                            sx={{
                                mb: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {agent.description}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ChatIcon />}
                    onClick={handleChatClick}
                    sx={{ mt: 2, alignSelf: 'flex-start' }}
                >
                    Chat with Agent
                </Button>
            </CardContent>
        </Card>
    );
};

export default AgentCard;
