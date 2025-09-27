import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names intelligently while supporting conditional classes.
 * @public
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
