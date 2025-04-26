import React from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import AgentCard from './AgentCard';
import { listAgents } from './data';
import AgentSearch from './AgentSearch';
import AgentFilter from './AgentFilter';

interface AgentListProps {
    agents: IAgent[];
}

const AgentGallery: React.FC<AgentListProps> = ({ agents }) => {
    return (
        <Box sx={{
            p: 2,
        }}>
            <AgentFilter />
            <AgentSearch onSearch={() => { /* handle search */ }} />

            <Grid container spacing={3}>
                {listAgents.map(agent => (
                    <Grid
                        // item
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}
                        key={agent.id}
                    >
                        <AgentCard agent={agent} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};


export default AgentGallery;
