import mongoose from 'mongoose';
import { workflowStageStatus } from '../../common/constants/workflowInstance.constant';

const Schema = mongoose.Schema;

const workflowInstanceSchema = new Schema(
    {
        // _id: multi stage workflow instance id, (mongodb default id)
        _wid: {
            // workflow id the instance belongs to
            type: String,
            required: true,
        },
        // _id of the workflow creator/owner
        created_by: {
            type: String,
            required: true,
        },
        assignee_id: {
            // assignee id the workflow belongs to
            type: String,
            required: true,
        },
        currentStageNumber: {
            type: Number,
            default: 0,
        },
        stages: {
            type: Map,
            of: new Schema({
                status: {
                    type: String,
                    required: true,
                    default: workflowStageStatus.INACTIVE, // 'INACTIVE' | 'INPROGRESS' | 'COMPLETE'
                },
                record_id: {
                    type: String,
                    required: true,
                },
            }),
            default: {},
        },
        stagePermissions: {
            type: Map,
            of: Array(String),
            default: {}, // no permission to anyone
        },
    },
    { timestamps: true }
);

const workflowInstance = mongoose.model(
    'workflowInstances',
    workflowInstanceSchema
);
export default workflowInstance;
