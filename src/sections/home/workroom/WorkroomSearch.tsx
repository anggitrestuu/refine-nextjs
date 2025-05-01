import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface WorkroomSearchProps {
    onSearch: (query: string) => void;
}

const WorkroomSearch: React.FC<WorkroomSearchProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                placeholder="Search workrooms..."
                value={searchValue}
                onChange={handleSearchChange}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    bgcolor: 'background.surface',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                    }
                }}
            />
        </Box>
    );
};

export default WorkroomSearch;
