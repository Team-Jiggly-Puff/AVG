export default interface CustomError extends Error {
    log?: string;
    status?: number;
};

export interface Option {
    option: string;
    id?: number;
    question?: string;
    question_id?: number;
    data_type?: string;
    poll_id?: number;
    created_by?: string;
    options_type?: string;
}

export interface Question {
    question?: string;
    options_type?: string;
    options: (Option | string)[];
    poll_id?: number;
    topic?: string;
    created_by?: string;
}

export interface Poll {
    topic: string;
    created_by?: string;
    questions: Question[];
}

export interface Answer {
    user_id: number;
    option_id: number;
    option: string;
    topic: string;
    question: string;
}