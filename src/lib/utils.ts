import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string.
 * Uses `clsx` for conditional classes and `tailwind-merge` to handle Tailwind CSS conflicts.
 *
 * @param {...ClassValue[]} inputs - Class names or conditional class objects.
 * @returns {string} Merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
