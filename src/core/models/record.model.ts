import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
    {
        _wid: {
            type: String,
            required: true,
            index: true,
        },
        created_by: {
            type: Number,
            required: true,
        },
        data: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

const Record = mongoose.model('records', RecordSchema);
export default Record;
