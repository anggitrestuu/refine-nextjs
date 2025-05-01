import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    MenuItem,
    Box,
    CircularProgress
} from '@mui/material';
import { useForm } from "@refinedev/react-hook-form";
import { HttpError, useCreate, useUpdate, useOne, useNotification } from "@refinedev/core";

type FormValues = {
    title: string;
    description: string;
    model: string;
    prompt: string;
    canvases: string;
};

type IDataCanvases = {
    canvases: string[]
}

interface IAgentDetail extends FormValues {
    slug: string;
    list_type: string;
}

interface AgentDialogProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: FormValues;
    slug?: string;
    onSuccess?: () => void;
}

export const AgentDialog: React.FC<AgentDialogProps> = ({
    open,
    onClose,
    mode,
    initialData,
    slug,
    onSuccess
}) => {
    const { open: openNotification } = useNotification();
    const { mutateAsync: create } = useCreate({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<FormValues, HttpError, FormValues>({
        defaultValues: initialData || {
            title: '',
            description: '',
            model: '',
            prompt: '',
            canvases: '',
        }
    });

    // Fetch agent details when in edit mode
    const { data: agentDetails, isLoading: isLoadingDetails } = useOne<IAgentDetail>({
        dataProviderName: "meridian",
        resource: "api/agents/details",
        id: slug || "",
        queryOptions: {
            enabled: mode === 'edit' && !!slug && open,
        }
    });

    const { data: dataModels } = useOne<string[]>({
        dataProviderName: "meridian",
        resource: "api/models",
        id: "list",
    });

    const { data: dataCanvases } = useOne<IDataCanvases>({
        dataProviderName: "meridian",
        resource: "api/canvas",
        id: "list",
    });

    useEffect(() => {
        if (open && mode === 'edit' && agentDetails?.data) {
            const detail = agentDetails.data;

            reset({
                title: detail.title,
                description: detail.description,
                model: detail.model,
                prompt: detail.prompt,
                canvases: detail.canvases,
            });
        } else if (open && mode === 'create') {
            reset({
                title: '',
                description: '',
                model: '',
                prompt: '',
                canvases: '',
            });
        }
    }, [open, agentDetails, reset, mode]);

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);
            if (mode === 'create') {
                await create({
                    dataProviderName: "meridian",
                    resource: "api/agents/create",
                    values: data,
                });
                openNotification?.({
                    type: 'success',
                    message: 'Agent created successfully',
                });
            } else {
                await create({
                    dataProviderName: "meridian",
                    resource: `api/agents/edit/${slug}`,
                    values: data,
                });
                openNotification?.({
                    type: 'success',
                    message: 'Agent updated successfully',
                });
            }

            reset();
            if (onSuccess) {
                onSuccess();
            }
            onClose();
        } catch (error) {
            console.error(error);
            openNotification?.({
                type: 'error',
                message: 'An error occurred',
                description: 'Failed to save agent',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {mode === 'create' ? 'Create New Agent' : 'Edit Agent'}
                </DialogTitle>
                <DialogContent>
                    {mode === 'edit' && isLoadingDetails ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                {...register("title", {
                                    required: "This field is required"
                                })}
                                label="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                disabled={isSubmitting}
                            />

                            <TextField
                                {...register("description", {
                                    required: "This field is required"
                                })}
                                label="Description"
                                multiline
                                rows={3}
                                fullWidth
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                disabled={isSubmitting}
                            />

                            <TextField
                                {...register("model", {
                                    required: "This field is required"
                                })}
                                select
                                label="Model"
                                fullWidth
                                value={watch("model")}
                                error={!!errors.model}
                                helperText={errors.model?.message}
                                disabled={isSubmitting}
                            >
                                {dataModels?.data?.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                {...register("prompt", {
                                    required: "This field is required"
                                })}
                                label="Prompt"
                                multiline
                                rows={4}
                                fullWidth
                                error={!!errors.prompt}
                                helperText={errors.prompt?.message}
                                disabled={isSubmitting}
                            />

                            <TextField
                                {...register("canvases", {
                                    required: "This field is required"
                                })}
                                select
                                value={watch("canvases")}
                                label="Canvases"
                                fullWidth
                                error={!!errors.canvases}
                                helperText={errors.canvases?.message}
                                disabled={isSubmitting}
                            >
                                {
                                    dataCanvases?.data?.canvases?.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || (mode === 'edit' && isLoadingDetails)}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            mode === 'create' ? 'Create' : 'Save'
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AgentDialog;
