export const LANGUAGES = {
    11: "Bosque",
    3: "C3",
    1: "C",
    2: "C++",
    22: "C# (Mono)",
    4: "Java",
    9: "Nim",
    26: "Python 2.7",
    28: "Python 3.10",
} as const;

export type LanguageKey = keyof typeof LANGUAGES;

export const getLanguageId = (key: LanguageKey): number => LANGUAGES[key];

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
