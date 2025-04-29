import React from 'react';
import { Box, Grid2 as Grid, Button } from '@mui/material';
import AgentCard from './AgentCard';
import { listAgents } from './data';
import AgentSearch from './AgentSearch';
import AgentFilter from './AgentFilter';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Iconify from '@components/iconify';

interface AgentListProps {
    agents: IAgent[];
}

const AgentGallery: React.FC<AgentListProps> = ({ agents }) => {
    return (
        <>
            <Box sx={{
                p: 2,
            }}>
                <CustomBreadcrumbs
                    heading="Agents"
                    links={[
                        {
                            name: 'Home',
                            href: '/app/home',
                        },
                        {
                            name: 'Agents',
                        },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            href="/app/agents/create"
                        >
                            Create Agent
                        </Button>
                    }
                />

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
        </>
    );
};


export default AgentGallery;
