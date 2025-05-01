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
    SelectChangeEvent
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { HttpError, useCreate, useUpdate, useOne, useNotification, useList } from "@refinedev/core";
import { createWorkroom, updateWorkroom } from '@/services/workroom-service';
import { IWorkroom } from './type';
import { IAgent } from '../agent/type';

type FormValues = {
    title: string;
    description: string;
    model: string;
    prompt: string;
    agents: string;
    tools: string;
    canvases?: string;
};

type IDataCanvases = {
    canvases: string[]
}

type IDataAgents = {
    agents: {
        title: string;
        slug: string;
    }[]
}

type IDataTools = {
    tools: {
        title: string;
        slug: string;
    }[]
}

interface WorkroomDialogProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: IWorkroom;
    onSuccess: () => void;
}

export const WorkroomDialog: React.FC<WorkroomDialogProps> = ({
    open,
    onClose,
    mode,
    initialData,
    onSuccess
}) => {
    const { open: openNotification } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
    } = useForm<FormValues>({
        defaultValues: initialData || {
            title: '',
            description: '',
            model: '',
            prompt: '',
            agents: '',
            tools: '',
            canvases: ''
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

    const { data: dataAgents } = useList<IAgent>({
        dataProviderName: "meridian",
        resource: "api/agents/list"
    })

    console.log("dataAgents", dataAgents);

    const { data: dataTools } = useOne<IDataTools>({
        dataProviderName: "meridian",
        resource: "api/tools/list",
    });

    // Add state to track array values
    const [agentsArray, setAgentsArray] = useState<string[]>([]);
    const [toolsArray, setToolsArray] = useState<string[]>([]);

    useEffect(() => {
        if (open && initialData) {
            // Convert comma-separated strings to arrays
            const agentsArr = initialData.agents ? initialData.agents.split(',').filter(Boolean) : [];
            const toolsArr = initialData.tools ? initialData.tools.split(',').filter(Boolean) : [];

            setAgentsArray(agentsArr);
            setToolsArray(toolsArr);

            reset({
                title: initialData.title,
                description: initialData.description,
                model: initialData.model,
                prompt: initialData.prompt,
                agents: initialData.agents,
                tools: initialData.tools,
                canvases: initialData.canvases
            });
        } else if (open) {
            setAgentsArray([]);
            setToolsArray([]);

            reset({
                title: '',
                description: '',
                model: '',
                prompt: '',
                agents: '',
                tools: '',
                canvases: ''
            });
        }
    }, [open, initialData, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            // Create a copy of the data to submit
            const submitData = {
                ...data,
                agents: agentsArray.join(','),
                tools: toolsArray.join(',')
            };

            if (mode === 'create') {
                await createWorkroom(submitData);
                openNotification?.({
                    type: 'success',
                    message: 'Workroom created successfully',
                });
            } else if (mode === 'edit' && initialData?.slug) {
                await updateWorkroom(initialData.slug, submitData);
                openNotification?.({
                    type: 'success',
                    message: 'Workroom updated successfully',
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
                                        {dataModels?.data?.map((model) => (
                                            <MenuItem key={model} value={model}>
                                                {model}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.model && (
                                        <FormHelperText>{errors.model.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <TextField
                            label="Prompt"
                            fullWidth
                            multiline
                            rows={4}
                            {...register('prompt', { required: 'Prompt is required' })}
                            error={!!errors.prompt}
                            helperText={errors.prompt?.message}
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
                                        {dataTools?.data?.tools?.map((tool) => (
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
                            {...register("canvases", {
                                required: "This field is required"
                            })}
                            select
                            label="Canvases"
                            fullWidth
                            error={!!errors.canvases}
                            helperText={errors.canvases?.message}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        {mode === 'create' ? 'Create' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
