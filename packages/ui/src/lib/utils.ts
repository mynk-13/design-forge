import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Consumer className always wins — later values override earlier ones.
 *
 * @example
 * cn("px-4 py-2", "px-6")           // → "py-2 px-6"
 * cn("text-sm", { "font-bold": true }) // → "text-sm font-bold"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
