import Workflow from "../models/workflow.model";
import { WorkflowFilter, WorkflowPayload } from "../../common/dto/workflow.dto";

export async function insert(workflowData: WorkflowPayload) {
  const workflow = new Workflow(workflowData);

  return await workflow.save();
}

export async function find(filter?: WorkflowFilter) {
  if (filter && !filter.single) {
    return await Workflow.find(filter);
  }

  if (filter && filter.single) {
    return (await Workflow.findOne(filter)) || {};
  }

  return await Workflow.find();
}

export async function updateSingleWorkflow(
  filter: WorkflowFilter,
  data: WorkflowPayload
) {
  return await Workflow.updateOne(filter, {
    $set: {
      ...data,
    },
  });
}

export async function deleteSingleWorkflow(filter: WorkflowFilter) {
  return await Workflow.deleteOne(filter);
}
