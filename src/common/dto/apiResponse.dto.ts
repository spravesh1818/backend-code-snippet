/**
 * Interface for api error responses.
 */
export interface ApiErrorResponse {
  code: number;
  message: string;
  data?: object;
}
