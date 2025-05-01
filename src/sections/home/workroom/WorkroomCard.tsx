import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { IWorkroom } from './type';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWorkroomStore } from '@/hooks/useWorkroomStore';
import { deleteWorkroom } from '@/services/workroom-service';
import { useNotification } from '@refinedev/core';

interface WorkroomCardProps {
    workroom: IWorkroom;
    onEdit: (workroom: IWorkroom) => void;
    onDelete: (slug: string) => void;
}

const WorkroomCard: React.FC<WorkroomCardProps> = ({ workroom, onEdit, onDelete }) => {
    const { selectWorkroom } = useWorkroomStore();
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
        // Select this workroom in the store
        selectWorkroom(workroom);

        // Scroll to the chat window if needed
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleEditClick = () => {
        handleMenuClose();
        onEdit(workroom);
    };

    const handleDeleteClick = async () => {
        handleMenuClose();

        try {
            await deleteWorkroom(workroom.slug);
            onDelete(workroom.slug);
            open?.({
                type: 'success',
                message: 'Workroom deleted successfully',
            });
        } catch (error) {
            open?.({
                type: 'error',
                message: 'Failed to delete workroom',
            });
        }
    };

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
                p: 2
            }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h6" noWrap sx={{ maxWidth: '70%' }}>
                        {workroom.title}
                    </Typography>
                    <Box>
                        <Chip
                            label={workroom.model}
                            size="small"
                            color="primary"
                            variant="outlined"
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

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        flex: 1
                    }}
                >
                    {workroom.description}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                    <Button
                        variant="contained"
                        startIcon={<ChatIcon />}
                        fullWidth
                        onClick={handleChatClick}
                    >
                        Chat
                    </Button>
                </Stack>
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
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default WorkroomCard;
