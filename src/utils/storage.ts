/**
 * Utility functions for safely accessing browser storage in a Next.js environment
 */

// Check if code is running in browser environment
const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

// Safe localStorage getter
export const getStorageItem = (key: string): string | null => {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
};

// Safe localStorage setter
export const setStorageItem = (key: string, value: string): void => {
  if (isBrowser()) {
    localStorage.setItem(key, value);
  }
};

// Safe localStorage remover
export const removeStorageItem = (key: string): void => {
  if (isBrowser()) {
    localStorage.removeItem(key);
  }
};
