import React from 'react';
import { Box } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import OptionButton from './OptionButton';

export interface QuickOption {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const OPTIONS: QuickOption[] = [
    {
        icon: <SmartToyIcon fontSize="large" />,
        label: 'Talk to AI',
        onClick: () => {
            console.log('Talk to AI clicked');
        },
    },
    {
        icon: <HomeIcon fontSize="large" />,
        label: 'Workroom',
        onClick: () => {
            console.log('Workroom clicked');
        },
    },
    {
        icon: <GroupIcon fontSize="large" />,
        label: 'Organization',
        onClick: () => {
            console.log('Organization clicked');
        },
    },
];

const QuickOptions: React.FC = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
            height: '100%',
        }}
    >
        {OPTIONS.map((opt) => (
            <OptionButton
                key={opt.label}
                icon={opt.icon}
                label={opt.label}
                onClick={opt.onClick}
            />
        ))}
    </Box>
);

export default QuickOptions;
