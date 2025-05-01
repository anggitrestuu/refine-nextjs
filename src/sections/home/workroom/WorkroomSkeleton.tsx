import React from 'react';
import { Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function WorkroomSkeleton() {
    return (
        <Card variant="outlined" sx={{
            bgcolor: "background.surface",
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <CardContent sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                minHeight: 200
            }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    {/* Title skeleton */}
                    <Skeleton variant="text" width="60%" height={32} />

                    {/* Chip skeleton */}
                    <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                </Stack>

                <Stack spacing={1} sx={{ flex: 1 }}>
                    {/* Description skeleton lines */}
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="80%" />
                </Stack>

                {/* Button skeleton */}
                <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1, mt: 'auto' }} />
            </CardContent>
        </Card>
    );
}
