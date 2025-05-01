import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';

interface WorkroomFilterProps {
    // Add filter props as needed
}

const WorkroomFilter: React.FC<WorkroomFilterProps> = () => {
    return (
        <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    Filters:
                </Typography>
                <Chip 
                    label="All Workrooms" 
                    color="primary" 
                    variant="filled" 
                    size="small"
                />
                {/* Add more filter chips as needed */}
            </Stack>
        </Box>
    );
};

export default WorkroomFilter;
