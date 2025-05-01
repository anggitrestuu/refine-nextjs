import { Box, Tabs, Tab, Typography } from '@mui/material'
import React, { useState } from 'react'
import { labelValueFilterAgents } from './constants'

export default function AgentFilter() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle1" color='text.primary'>
                Filter by scope
            </Typography>

            <Box sx={{ borderRadius: 1, bgcolor: 'background.surface', px: 2 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {labelValueFilterAgents.map((item, index) => (
                        <Tab key={index} label={item.label} value={index} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}
