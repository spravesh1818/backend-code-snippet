import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    currentUser?: any; // TODO - remove temporary datatype
    currentApp?: string;
}
