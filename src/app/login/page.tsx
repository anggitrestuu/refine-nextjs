"use client";

import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ThemedTitleV2 } from "@refinedev/mui";
import Alert from "@mui/material/Alert";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { mutateAsync: login } = useLogin();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);

    try {
      const response = await login({
        email: data.email,
        password: data.password
      });

      if (response?.error) {
        setError(response?.error?.message || "An error occurred during login");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred during login");
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="24px"
        justifyContent="center"
        flexDirection="column"
        sx={{ width: "100%", maxWidth: "400px" }}
      >
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
          >
            Sign in
          </Button>
        </form>

        <Typography align="center" color="text.secondary" fontSize="12px">
          Powered by Meridian API
        </Typography>
      </Box>
    </Container>
  );
}
