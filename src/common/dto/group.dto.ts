import mongoose from 'mongoose';

export interface iGroupPayload {
    _id?: string;
    data: {
        name: string;
        uids: [];
    };
}

export interface iGroupFilter {
    _id?: string | mongoose.Types.ObjectId;
}
