/**
 * Utility functions for handling cookies in a Next.js environment
 * This file is designed to work in both client and server components
 */

// Check if code is running in browser environment
const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

// Get a cookie value (client-side only)
export const getCookie = (name: string): string | undefined => {
  if (!isBrowser()) {
    console.warn(
      "getCookie was called on the server side. This only works in client components."
    );
    return undefined;
  }

  // Client-side implementation
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts[1].split(";").shift();
  }
  return undefined;
};

// Set a cookie (client-side only)
export const setCookie = (name: string, value: string, exdays = 3): void => {
  if (!isBrowser()) {
    console.warn(
      "setCookie was called on the server side. This only works in client components."
    );
    return;
  }

  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// Remove a cookie (client-side only)
export const removeCookie = (name: string): void => {
  if (!isBrowser()) {
    console.warn(
      "removeCookie was called on the server side. This only works in client components."
    );
    return;
  }

  document.cookie = `${name}=;path=/;max-age=0`;
};
