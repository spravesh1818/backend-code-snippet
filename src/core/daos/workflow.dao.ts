import Workflow from '../models/workflow.model';
import {
    iWorkflowFilter,
    iWorkflowPayload,
} from '../../common/dto/workflow.dto';

export async function insert(workflowData: iWorkflowPayload) {
    const workflow = new Workflow(workflowData);

    return await workflow.save();
}

export async function find(filter?: iWorkflowFilter) {
    if (filter && !filter.single) {
        return await Workflow.find(filter);
    }

    if (filter && filter.single) {
        return (await Workflow.findOne(filter)) || {};
    }

    return await Workflow.find();
}

export async function updateSingleWorkflow(
    filter: iWorkflowFilter,
    data: iWorkflowPayload
) {
    return await Workflow.updateOne(filter, {
        $set: {
            ...data,
        },
    });
}

export async function deleteSingleWorkflow(filter: iWorkflowFilter) {
    return await Workflow.deleteOne(filter);
}
