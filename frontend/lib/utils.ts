import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ACTION = {
  JOIN: "JOIN",
  JOINED: "JOINED",
  DISCONNECTED: "DISCONNECTED",
  CODE_CHANGE: "CODE_CHANGE",
  REQUEST_SYNC: "REQUEST_SYNC",
  SYNC_CODE: "SYNC_CODE",
  CURSOR_MOVE: "CURSOR_MOVE",
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};


