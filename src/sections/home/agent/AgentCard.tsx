// src/features/agent/components/AgentCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { IAgent } from './type';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAgentStore } from '@/hooks/useAgentStore';
import { useNotification } from '@refinedev/core';

interface AgentCardProps {
    agent: IAgent;
    onEdit: (agent: IAgent) => void;
    onDelete?: (slug: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onEdit, onDelete }) => {
    const { selectAgent } = useAgentStore();
    const { open } = useNotification();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleChatClick = () => {
        // Select this agent in the store
        selectAgent(agent);

        // Scroll to the chat window if needed
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleEditClick = () => {
        handleMenuClose();
        onEdit(agent);
    };

    const handleDeleteClick = async () => {
        handleMenuClose();
        if (onDelete) {
            try {
                onDelete(agent.slug);
                open?.({
                    type: 'success',
                    message: 'Agent deleted successfully',
                });
            } catch (error) {
                open?.({
                    type: 'error',
                    message: 'Failed to delete agent',
                });
            }
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

                    <Box>
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
                        <IconButton
                            size="small"
                            onClick={handleMenuClick}
                            sx={{ ml: 1 }}
                        >
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Box>
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

            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                {onDelete && (
                    <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                        Delete
                    </MenuItem>
                )}
            </Menu>
        </Card>
    );
};

export default AgentCard;
