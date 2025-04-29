// src/features/agent/components/AgentCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip } from '@mui/material';
import { IAgent } from './type';

interface AgentCardProps {
    agent: IAgent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
    return (
        <Card variant="outlined" sx={{
            bgcolor: "background.surface",
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
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

                    {/* {agent.systemPrompt && (
                        <Typography
                            variant="body2"
                            color='text.secondary'
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {agent.systemPrompt}
                        </Typography>
                    )} */}
                </Box>
            </CardContent>
        </Card>
    );
};

export default AgentCard;
