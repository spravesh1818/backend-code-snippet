import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        emails: [],
    },
    { timestamps: true }
);

const Group = mongoose.model('group', GroupSchema);
export default Group;
