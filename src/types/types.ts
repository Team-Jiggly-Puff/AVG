export default interface CustomError extends Error {
    log?: string;
    status?: number;
};