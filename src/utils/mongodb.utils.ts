import mongoose from 'mongoose';

/**
 * Convert from string to mongo db ObjectId type
 */
export function getMongoObjectId(id: string | mongoose.Types.ObjectId) {
    return new mongoose.Types.ObjectId(id);
}
