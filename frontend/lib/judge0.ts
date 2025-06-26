import {Judge0Config, SubmissionRequest, SubmissionResult} from "@/data";

const url = 'https://judge0-extra-ce.p.rapidapi.com';

const getHeaders = (apiKey: string) => {
    return {
        'x-rapidapi-key': '5c8951a3dcmsh9676f53289e824dp16c2aejsn59b69be37e53',
        'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
}


export const submitCode = async (submission: SubmissionRequest, config: Judge0Config) => {

    const response = await fetch(`${url}/submissions?base64_encoded=true&wait=false&fields=*`, {
        method: 'POST',
        headers: getHeaders(config.apiKey),
        body: JSON.stringify(submission)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    return data;
}

export const getSubmission = async (token: string, config: Judge0Config) => {

    const response = await fetch(`${url}/submissions/${token}?base64_encoded=true&fields=*`, {
        method: 'GET',
        headers: getHeaders(config.apiKey)
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    return data;
}

export const executeCode = async (
    submission: SubmissionRequest,
    config: Judge0Config
): Promise<SubmissionResult> => {
    const submitResponse = await submitCode(submission, config);

    let result: SubmissionResult;
    let attempts = 0;
    const maxAttempts = 10;

    do {
        await new Promise(resolve => setTimeout(resolve, 1000));
        result = await getSubmission(submitResponse.token, config);
        attempts++;
    } while (result.status.id <= 2 && attempts < maxAttempts);

    return result;
}

