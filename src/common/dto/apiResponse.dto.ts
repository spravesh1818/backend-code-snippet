/**
 * Interface for api error responses.
 */
export interface iApiErrorResponse {
    code: number;
    message: string;
    data?: object;
}
