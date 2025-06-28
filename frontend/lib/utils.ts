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

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}





