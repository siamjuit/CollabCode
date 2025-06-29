import { useCallback, useRef, useState } from 'react';
import {toast} from "sonner";
import {saveCodeToDatabase} from "@/features/editor/api";

const useSaveCode = (roomId: string, token: string, debounceDelay = 2000) => {
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSavedCodeRef = useRef('');

    const debouncedSave = useCallback((code: string) => {
        if (code === lastSavedCodeRef.current) {
            return;
        }

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        setIsSaving(true);
        console.log("saving")

        saveTimeoutRef.current = setTimeout(async () => {
            try {
                await saveCodeToDatabase(roomId, code, token);
                lastSavedCodeRef.current = code;
                setLastSaved(new Date());
                setIsSaving(false);


            } catch (error) {
                console.error('Auto-save failed:', error);
                setIsSaving(false);
                toast.error('Failed to auto-save code');
            }
        }, debounceDelay);
    }, [roomId, token, debounceDelay]);

    const saveNow = useCallback(async (code: string) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        setIsSaving(true);

        try {
            await saveCodeToDatabase(roomId, code, token);
            lastSavedCodeRef.current = code;
            setLastSaved(new Date());
            setIsSaving(false);
            toast.success('Code saved successfully');
        } catch (error) {
            console.error('Manual save failed:', error);
            setIsSaving(false);
            toast.error('Failed to save code');
            throw error;
        }
    }, [roomId, token]);

    const forceSave = useCallback(async (code: string) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        if (code && code !== lastSavedCodeRef.current) {
            try {
                await saveCodeToDatabase(roomId, code, token);
                lastSavedCodeRef.current = code;
            } catch (error) {
                console.error('Force save failed:', error);
            }
        }
    }, [roomId, token]);

    const cleanup = useCallback(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
    }, []);

    return {
        debouncedSave,
        saveNow,
        forceSave,
        cleanup,
        isSaving,
        lastSaved,
    };
};

export default useSaveCode;
