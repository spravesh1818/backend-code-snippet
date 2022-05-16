import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecordEventSchema = new Schema(
    {
        status: {
            type: Number,
            required: true,
        },
        event: {
            type: String,
            required: true,
        },
        meta: {
            id: {
                type: String,
                required: true,
            },
            remarks: {
                type: String,
                required: false,
            },
        },
    },
    { timestamps: true }
);

const RecordEvent = mongoose.model('recordEvents', RecordEventSchema);
export default RecordEvent;
