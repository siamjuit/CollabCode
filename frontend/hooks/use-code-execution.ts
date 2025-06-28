import { useState, useCallback } from 'react';
import {executeCodeClient, getResultClient, submitCodeClient} from "@/lib/judge0-client";
import {SubmissionRequest, SubmissionResult} from "@/data"

export const useCodeExecution = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [result, setResult] = useState<SubmissionResult | null>(null);

    const executeCode = useCallback(async (submission: SubmissionRequest) => {
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await executeCodeClient(submission);
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    const submitAndPoll = useCallback(async (submission: SubmissionRequest) => {
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const { token } = await submitCodeClient(submission);

            let attempts = 0;
            const maxAttempts = 10;
            let data: SubmissionResult;

            do {
                if (attempts > 0) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                data = await getResultClient(token);
                attempts++;
            } while (data.status.id <= 2 && attempts < maxAttempts);

            console.log(data);
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setResult(null);
        setError('');
        setLoading(false);
    }, []);

    return {
        loading,
        error,
        result,
        executeCode,
        submitAndPoll,
        reset,
    };
}
