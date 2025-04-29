// src/features/agent/components/AgentSearch.tsx
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import Iconify from '@components/iconify';

interface AgentSearchProps {
    onSearch: (query: string) => void;
}

const AgentSearch: React.FC<AgentSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <TextField
                sx={{
                    bgcolor: "background.surface"
                }}
                placeholder="Search for agents..."
                size='small'
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleSearchChange}
                slotProps={{
                    input: {
                        startAdornment: (
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                <Iconify height={20} width={20} icon="eva:search-fill" />
                            </Box>
                        ),
                    }
                }}
            />
        </Box>
    );
};

export default AgentSearch;
