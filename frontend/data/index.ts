export const LANGUAGES = {
    BASH: 46,
    C: 50,
    CPP: 54,
    CSHARP: 51,
    GO: 60,
    JAVA: 62,
    JAVASCRIPT: 27,
    PYTHON: 71,
    RUST: 73,
    TYPESCRIPT: 74,
} as const;

export interface SubmissionRequest {
    source_code: string;
    language_id: number;
    stdin?: string;
    expected_output?: string;
}

export interface SubmissionResponse {
    token: string
}

export interface SubmissionResult {
    token: string;
    source_code: string;
    language_id: number;
    stdin: string;
    stdout: string;
    stderr: string;
    status: {
        id: number;
        description: string;
    };
    time: string;
    memory: number;
    compile_output: string;
}

export interface Judge0Config {
    apiKey: string;
    baseURL?: string;
}
