import mongoose from 'mongoose';

export interface iUserPayload {
    _id?: string;
    data: {
        name: string;
        email: string;
    };
}

export interface iUserFilter {
    _id?: string | mongoose.Types.ObjectId;
}
