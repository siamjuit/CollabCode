import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum ACTION {
  JOIN = 'join',
  JOINED = 'joined',
  DISCONNECTED = 'disconnected',
  CODE_CHANGE = 'code_change',
  SYNC_CODE = 'sync_code',
  LEAVE = 'leave'
}

