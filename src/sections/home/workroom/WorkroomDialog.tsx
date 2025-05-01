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
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    Chip,
    Box,
    OutlinedInput,
    CircularProgress
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useOne, useNotification, useList, useCreate } from "@refinedev/core";
import { IWorkroom, IWorkroomDetail } from './type';
import { IAgent } from '../agent/type';

type FormValues = {
    title: string;
    description: string;
    agents: string;
    tools: string;
    model: string;
    prompt: string;
    canvases: string;
};


type IDataTool = {
    title: string;
    slug: string;
    description: string;
    environments: {
        key: string;
        alias: string;
    };
}

type IDataCanvases = {
    canvases: string[]
}

interface WorkroomDialogProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: IWorkroom;
    workroomSlug?: string;
    onSuccess: () => void;
}

export const WorkroomDialog: React.FC<WorkroomDialogProps> = ({
    open,
    onClose,
    mode,
    initialData,
    workroomSlug,
    onSuccess
}) => {
    const { open: openNotification } = useNotification();

    // Fetch workroom details when in edit mode
    const { data: workroomDetails, isLoading: isLoadingDetails } = useOne<IWorkroomDetail>({
        dataProviderName: "meridian",
        resource: "api/workroom/details",
        id: workroomSlug || "",
        queryOptions: {
            enabled: mode === 'edit' && !!workroomSlug && open,
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading: isFormLoading },
        reset,
        control,
    } = useForm<FormValues>({
        defaultValues: initialData || {
            title: '',
            description: '',
            agents: '',
            tools: '',
            model: '',
            prompt: '',
            canvases: '',
        }
    });

    const { data: dataAgents } = useList<IAgent>({
        dataProviderName: "meridian",
        resource: "api/agents/list"
    })

    const { data: dataTools } = useList<IDataTool>({
        dataProviderName: "meridian",
        resource: "api/tools/list",
    });

    const { data: dataCanvases } = useOne<IDataCanvases>({
        dataProviderName: "meridian",
        resource: "api/canvas",
        id: "list",
    });


    const { data: dataModels } = useOne<string[]>({
        dataProviderName: "meridian",
        resource: "api/models",
        id: "list",
    });

    const { mutateAsync: createWorkroom } = useCreate({})
    const { mutateAsync: updateWorkroom } = useCreate({})

    // Add state to track array values
    const [agentsArray, setAgentsArray] = useState<string[]>([]);
    const [toolsArray, setToolsArray] = useState<string[]>([]);

    useEffect(() => {
        if (open && mode === 'edit' && workroomDetails?.data) {
            const detail = workroomDetails.data;

            // Extract agent and tool slugs
            const agentsArr = detail.agents ? detail.agents.map(agent => agent.slug) : [];
            const toolsArr = detail.tools ? detail.tools.map(tool => tool.slug) : [];

            setAgentsArray(agentsArr);
            setToolsArray(toolsArr);

            reset({
                title: detail.title,
                description: detail.description,
                model: detail.model,
                agents: agentsArr.join(','),
                tools: toolsArr.join(','),
                prompt: detail.prompt,
                canvases: detail.canvases,
            });
        } else if (open && mode === 'create') {
            setAgentsArray([]);
            setToolsArray([]);

            reset({
                title: '',
                description: '',
                agents: '',
                tools: '',
                model: '',
                prompt: '',
                canvases: '',
            });
        }
    }, [open, workroomDetails, reset, mode]);

    const onSubmit = async (data: FormValues) => {
        try {
            // Create a copy of the data to submit
            const submitData = {
                ...data,
                agents: agentsArray.join(','),
                tools: toolsArray.join(','),
            };

            if (mode === 'create') {
                await createWorkroom({
                    dataProviderName: "meridian",
                    resource: "api/workroom/create",
                    values: submitData,
                });
            } else if (mode === 'edit' && workroomSlug) {
                await updateWorkroom({
                    dataProviderName: "meridian",
                    resource: `api/workroom/edit/${workroomSlug}`,
                    values: submitData,
                });
            }
            onSuccess();
            onClose();
        } catch (error) {
            openNotification?.({
                type: 'error',
                message: 'An error occurred',
                description: 'Failed to save workroom',
            });
        } finally {
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {mode === 'create' ? 'Create New Workroom' : 'Edit Workroom'}
                </DialogTitle>
                <DialogContent>
                    {mode === 'edit' && isLoadingDetails ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <TextField
                                label="Title"
                                fullWidth
                                {...register('title', { required: 'Title is required' })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                {...register('description', { required: 'Description is required' })}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />



                            <Controller
                                name="agents"
                                control={control}
                                rules={{ required: 'At least one agent is required' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.agents}>
                                        <InputLabel>Agents</InputLabel>
                                        <Select
                                            multiple
                                            value={agentsArray}
                                            input={<OutlinedInput label="Agents" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            onChange={(e) => {
                                                const newValue = e.target.value as string[];
                                                setAgentsArray(newValue);
                                                field.onChange(newValue.join(','));
                                            }}
                                        >
                                            {dataAgents?.data?.map((agent) => (
                                                <MenuItem key={agent.slug} value={agent.slug}>
                                                    {agent.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.agents && (
                                            <FormHelperText>{errors.agents.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name="tools"
                                control={control}
                                // rules={{ required: 'At least one tool is required' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.tools}>
                                        <InputLabel>Tools</InputLabel>
                                        <Select
                                            multiple
                                            value={toolsArray}
                                            input={<OutlinedInput label="Tools" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            onChange={(e) => {
                                                const newValue = e.target.value as string[];
                                                setToolsArray(newValue);
                                                field.onChange(newValue.join(','));
                                            }}
                                        >
                                            {dataTools?.data?.map((tool) => (
                                                <MenuItem key={tool.slug} value={tool.slug}>
                                                    {tool.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.tools && (
                                            <FormHelperText>{errors.tools.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />

                            <TextField
                                label="Prompt"
                                fullWidth
                                multiline
                                rows={3}
                                {...register('prompt', { required: 'Prompt is required' })}
                                error={!!errors.prompt}
                                helperText={errors.prompt?.message}
                            />

                            <Controller
                                name="model"
                                control={control}
                                rules={{ required: 'Model is required' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.model}>
                                        <InputLabel>Model</InputLabel>
                                        <Select
                                            {...field}
                                            label="Model"
                                        >
                                            {dataModels?.data?.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.model && (
                                            <FormHelperText>{errors.model.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit" disabled={isFormLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isFormLoading}>
                        {isFormLoading ? (
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
