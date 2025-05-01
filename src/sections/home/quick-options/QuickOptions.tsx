import React from 'react';
import { Box } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import OptionButton from './OptionButton';
import aiGalleryLayout from '../layout/aiGalleryLayout';
import mainPageLayout from '../layout/mainPageLayout';
import { useLayoutStore } from '@/hooks/useLayoutStore';
import workroomGalleryLayout from '../layout/workroomGalleryLayout';

export interface QuickOption {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const QuickOptions: React.FC = () => {
    const { switchToLayout } = useLayoutStore();

    const OPTIONS: QuickOption[] = [
        {
            icon: <SmartToyIcon fontSize="large" />,
            label: 'Talk to AI',
            onClick: () => {
                switchToLayout(aiGalleryLayout);
            },
        },
        {
            icon: <HomeIcon fontSize="large" />,
            label: 'Workroom',
            onClick: () => {
                switchToLayout(workroomGalleryLayout);
            },
        },
        {
            icon: <GroupIcon fontSize="large" />,
            label: 'Organization',
            onClick: () => {
                switchToLayout(mainPageLayout);
            },
        },
    ];

    return (
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
};

export default QuickOptions;
