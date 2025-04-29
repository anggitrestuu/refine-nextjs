"use client";

import { AuthProvider } from "@refinedev/core";
import { axiosInstance } from "@providers/rest-data-provider/utils";
import { API_URLS, TENANT_ID } from "@config-global";
import Cookies from "js-cookie";

export const authProvider: AuthProvider = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      // Make a request to the meridian API for authentication
      const response = await axiosInstance.post(
        `${API_URLS.meridianUrl}/api/login/`,
        {
          username: email,
          password,
          tenant_id: TENANT_ID,
        }
      );

      // If successful, store the token and user data
      if (response.data.access) {
        Cookies.set("auth_token", response.data.access);

        // Set the token in axios headers for subsequent requests
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;

        return {
          success: true,
          redirectTo: "/home",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid credentials",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.response?.data?.message || "Login failed",
        },
      };
    }
  },

  logout: async () => {
    try {
      // Clear the stored token and user data
      Cookies.remove("auth_token");

      // Remove the token from axios headers
      delete axiosInstance.defaults.headers.common.Authorization;

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LogoutError",
          message: "Logout failed",
        },
      };
    }
  },

  check: async () => {
    // Check if the user is authenticated by looking for the token
    const token = Cookies.get("auth_token");
    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    // Set the token in axios headers
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    return {
      authenticated: true,
    };
  },

  getPermissions: async () => {
    // Implement permission logic if needed
    return null;
  },

  getIdentity: async () => {
    const response = await axiosInstance.get(
      `${API_URLS.heimdallUrl}/api/v1/auth/me`
    );
    const user = response.data?.data;

    return {
      id: user?.id,
      name: user?.username,
      email: user?.email,
      avatar: user?.email,
    };
  },

  onError: async (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // If unauthorized, clear the stored data and redirect to login
      Cookies.remove("auth_token");

      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    // For other errors, just return the error
    return {
      error,
    };
  },
};
