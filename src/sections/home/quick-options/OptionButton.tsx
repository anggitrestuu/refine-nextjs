import React from 'react';
import { Box, Typography } from '@mui/material';

export interface OptionButtonProps {
    /** Icon to render inside the circle */
    icon: React.ReactNode;
    /** Label shown below the icon */
    label: string;
    /** Click handler */
    onClick?: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ icon, label, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            width: 120,
            height: 120,
            bgcolor: 'primary.main',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'common.white',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
                bgcolor: 'primary.dark',
            },
        }}
    >
        {icon}
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
            {label}
        </Typography>
    </Box>
);

export default OptionButton;
