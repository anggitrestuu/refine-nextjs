import React, { useCallback, useState } from 'react';
import { Box, Grid2 as Grid, Button } from '@mui/material';
import AgentCard from './AgentCard';
import AgentSearch from './AgentSearch';
import AgentFilter from './AgentFilter';
import AgentSkeleton from './AgentSkeleton';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Iconify from '@components/iconify';
import AgentDialog from './AgentDialog';
import { useList, useModal } from '@refinedev/core';
import { IAgent } from './type';
import { debounce } from 'lodash';
import EmptyContent from '@components/empty-content';
import LayoutBreadcrumbs from '@components/layout-breadcrumbs/LayoutBreadcrumbs';
import mainPageLayout from '../layout/mainPageLayout';
import aiGalleryLayout from '../layout/aiGalleryLayout';
import { useLayoutStore } from '@hooks/useLayoutStore';

const AgentGallery: React.FC = () => {
    const { close: handleCloseCreateDialog, show: handleOpenCreateDialog, visible: createDialogOpen } = useModal()
    const [searchQuery, setSearchQuery] = useState('');
    const { switchToLayout } = useLayoutStore();


    const { data: dataAgents, isLoading } = useList<IAgent>({
        dataProviderName: "meridian",
        resource: "api/agents/list",
        filters: [
            {
                field: "search",
                operator: "eq",
                value: searchQuery,
            }
        ]
    })

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
        }, 500),
        []
    );

    const handleSearch = (query: string) => {
        debouncedSearch(query);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, index) => (
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 4,
                            }}
                            key={`skeleton-${index}`}
                        >
                            <AgentSkeleton />
                        </Grid>
                    ))}
                </Grid>
            );
        }

        if (!dataAgents?.data?.length) {
            return (
                <EmptyContent
                    title="No Agents Found"
                    description={searchQuery ? "No agents match your search criteria" : "Start by creating your first agent"}
                    img="/assets/illustrations/illustration_empty_content.svg"
                />
            );
        }

        return (
            <Grid container spacing={3}>
                {dataAgents.data.map(agent => (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}
                        key={agent.slug}
                    >
                        <AgentCard agent={agent} />
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <>
            <Box sx={{
                p: 2,
            }}>
                <LayoutBreadcrumbs
                    sx={{
                        bgcolor: "background.surface",
                        borderRadius: 2,
                        p: 2,
                        mb: 2
                    }}
                    heading="AI Agents"
                    links={[
                        { name: 'Home', href: '/home', layout: mainPageLayout },
                        { name: 'AI Agents', href: '/ai-gallery', layout: aiGalleryLayout },
                    ]}
                    switchToLayout={switchToLayout}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={handleOpenCreateDialog}
                        >
                            Create Agent
                        </Button>
                    }
                />

                <AgentFilter />
                <AgentSearch onSearch={handleSearch} />

                {renderContent()}
            </Box>

            <AgentDialog
                mode="create"
                open={createDialogOpen}
                onClose={handleCloseCreateDialog}
            />
        </>
    );
};


export default AgentGallery;
