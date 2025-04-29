import { Box, Typography } from '@mui/material'
import React from 'react'
import { labelValueFilterAgents } from './constants'



export default function AgentFilter() {
    return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle1" color='black'>
                Filter by scope
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, p: 0.7, borderRadius: 1, bgcolor: '#ece3d4' }}>
                {
                    labelValueFilterAgents.map(
                        (item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    bgcolor: 'background.surface',
                                    borderRadius: 1,
                                    px: 2,
                                    py: 0.7,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                    fontWeight: '500',
                                }}
                            >
                                {item.label}
                            </Box>
                        )
                    )
                }
            </Box>
        </Box>
    )
}
