import React, { useCallback, useState } from 'react';
import { Box, Grid2 as Grid, Button } from '@mui/material';
import WorkroomCard from './WorkroomCard';
import WorkroomSearch from './WorkroomSearch';
import WorkroomFilter from './WorkroomFilter';
import WorkroomSkeleton from './WorkroomSkeleton';
import Iconify from '@components/iconify';
import { WorkroomDialog } from './WorkroomDialog';
import { useCreate, useList, useModal } from '@refinedev/core';
import { IWorkroom } from './type';
import { debounce } from 'lodash';
import EmptyContent from '@components/empty-content';
import LayoutBreadcrumbs from '@components/layout-breadcrumbs/LayoutBreadcrumbs';
import mainPageLayout from '../layout/mainPageLayout';
import workroomGalleryLayout from '../layout/workroomGalleryLayout';
import { useLayoutStore } from '@hooks/useLayoutStore';

const WorkroomGallery: React.FC = () => {
    const { close: handleCloseCreateDialog, show: handleOpenCreateDialog, visible: createDialogOpen } = useModal();
    const { close: handleCloseEditDialog, show: handleOpenEditDialog, visible: editDialogOpen } = useModal();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedWorkroomSlug, setSelectedWorkroomSlug] = useState<string | undefined>(undefined);
    const { switchToLayout } = useLayoutStore();
    const { } = useCreate({});

    const { data: dataWorkrooms, isLoading, refetch } = useList<IWorkroom>({
        dataProviderName: "meridian",
        resource: "api/workroom/list",
        filters: [
            {
                field: "search",
                operator: "eq",
                value: searchQuery,
            }
        ]
    });

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

    const handleEditWorkroom = (workroom: IWorkroom) => {
        setSelectedWorkroomSlug(workroom.slug);
        handleOpenEditDialog();
    };

    const handleDeleteWorkroom = (slug: string) => {
        // Refetch the list after deletion
        refetch();
    };

    const handleDialogSuccess = () => {
        // Refetch the list after create/edit
        refetch();
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
                            <WorkroomSkeleton />
                        </Grid>
                    ))}
                </Grid>
            );
        }

        if (!dataWorkrooms?.data?.length) {
            return (
                <EmptyContent
                    title="No Workrooms Found"
                    description={searchQuery ? "No workrooms match your search criteria" : "Start by creating your first workroom"}
                    img="/assets/illustrations/illustration_empty_content.svg"
                />
            );
        }

        return (
            <Grid container spacing={3}>
                {dataWorkrooms.data.map(workroom => (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}
                        key={workroom.slug}
                    >
                        <WorkroomCard
                            workroom={workroom}
                            onEdit={handleEditWorkroom}
                            onDelete={handleDeleteWorkroom}
                        />
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
                    heading="Workrooms"
                    links={[
                        { name: 'Home', href: '/home', layout: mainPageLayout },
                        { name: 'Workrooms', href: '/workrooms', layout: workroomGalleryLayout },
                    ]}
                    switchToLayout={switchToLayout}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={handleOpenCreateDialog}
                        >
                            Create Workroom
                        </Button>
                    }
                />

                <WorkroomFilter />
                <WorkroomSearch onSearch={handleSearch} />

                {renderContent()}
            </Box>

            {
                createDialogOpen && (
                    <WorkroomDialog
                        mode="create"
                        open={createDialogOpen}
                        onClose={handleCloseCreateDialog}
                        onSuccess={handleDialogSuccess}
                    />
                )
            }
            {
                editDialogOpen && (
                    <WorkroomDialog
                        mode="edit"
                        open={editDialogOpen}
                        onClose={handleCloseEditDialog}
                        workroomSlug={selectedWorkroomSlug}
                        onSuccess={handleDialogSuccess}
                    />
                )
            }
        </>
    );
};

export default WorkroomGallery;
