import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names or class name arrays into a single string,
 * resolving Tailwind CSS class conflicts.
 *
 * @param {...ClassValue[]} inputs - Class names or arrays of class names.
 * @returns {string} The merged and optimized class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
