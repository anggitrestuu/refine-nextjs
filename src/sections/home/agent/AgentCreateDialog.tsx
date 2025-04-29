import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    MenuItem
} from '@mui/material';
import { useForm } from "@refinedev/react-hook-form";
import { HttpError, useCreate, useList, useOne } from "@refinedev/core";

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

interface AgentCreateDialogProps {
    open: boolean;
    onClose: () => void;
}



export const AgentCreateDialog: React.FC<AgentCreateDialogProps> = ({
    open,
    onClose
}) => {

    const { mutateAsync: create } = useCreate({})

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues, HttpError, FormValues>();

    const { data: dataModels } = useOne<string[]>({
        dataProviderName: "meridian",
        resource: "api/models",
        id: "list",
    })

    const { data: dataCanvases } = useOne<IDataCanvases>({
        dataProviderName: "meridian",
        resource: "api/canvas",
        id: "list",
    })


    const onSubmit = async (data: FormValues) => {
        try {
            await create({
                dataProviderName: "meridian",
                resource: "api/agents/create",
                values: data,
            })

            reset();
            onClose();
        } catch (error) {
            console.error(error);
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
                <DialogTitle>Create New Agent</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            {...register("title", {
                                required: "This field is required"
                            })}
                            label="Title"
                            fullWidth
                            error={!!errors.title}
                            helperText={errors.title?.message}
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
                        />

                        <TextField
                            {...register("model", {
                                required: "This field is required"
                            })}
                            select
                            label="Model"
                            fullWidth
                            error={!!errors.model}
                            helperText={errors.model?.message}
                        >
                            {dataModels?.data.map((option) => (
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
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};