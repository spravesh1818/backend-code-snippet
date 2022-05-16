import { StatusCodes } from "http-status-codes";

import { WorkflowFilter, WorkflowPayload } from "../../common/dto/workflow.dto";
import * as workflowDao from "../daos/workflow.dao";
import * as workflowInstanceDao from "../daos/workflowInstance.dao";
import log from "loglevel";

export async function insertWorkflow(workflowData: WorkflowPayload) {
  const response = await workflowDao.insert(workflowData);
  return response;
}

export async function getWorkflows(filter?: WorkflowFilter) {
  let result = await workflowDao.find(filter);
  const workflows = [];
  const singleWorkflowCount = 1;
  const noOfWorkflowsFound = result.length;
  const noOfWorkflows =
    noOfWorkflowsFound >= 0
      ? noOfWorkflowsFound
      : Object.keys(result).length && singleWorkflowCount;

  // append instance count to result
  for (let i = 0; i < noOfWorkflows; i++) {
    let workflow = JSON.parse(
      JSON.stringify(noOfWorkflowsFound ? result[i] : result)
    );

    let noOfInstancesWithWid = await workflowInstanceDao.findInstanceCount({
      _wid: workflow._id,
    });
    workflow["countInstance"] = noOfInstancesWithWid;
    noOfWorkflowsFound && workflows.push(workflow);
  }

  if (workflows.length) {
    result = workflows;
  }

  if (!noOfWorkflows && filter) {
    const errorMessage = `Workflow with _id: ${filter?._id} doesn't exist.`;
    log.error(errorMessage);
  }

  return result;
}

export async function updateWorkflow(
  filter: WorkflowFilter,
  data: WorkflowPayload
) {
  const workflow = await workflowDao.find(filter);

  if (!workflow) {
    log.error(`Workflow with _wid: ${filter._id}, doesn't exist.`);
  }

  return await workflowDao.updateSingleWorkflow(filter, data);
}

export async function deleteWorkflow(filter: WorkflowFilter) {
  const workflow = await workflowDao.find(filter);
  if (!workflow) {
    log.error(`Workflow with _wid: ${filter._id}, doesn't exist.`);
  }
  return await workflowDao.deleteSingleWorkflow(filter);
}
