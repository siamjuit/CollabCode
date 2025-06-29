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

export const languageColors: Record<string, string> = {
    'Bosque': 'bg-lime-500/20 text-lime-300 border-lime-500/30',
    'C3': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
    'C': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'C++': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'C# (Mono)': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Java': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Nim': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Python 2.7': 'bg-green-600/20 text-green-300 border-green-600/30',
    'Python 3.10': 'bg-green-400/20 text-green-200 border-green-400/30',
};

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
