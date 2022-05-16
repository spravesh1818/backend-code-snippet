import { StatusCodes } from "http-status-codes";

import {
  iWorkflowFilter,
  iWorkflowPayload,
} from "../../common/dto/workflow.dto";
import DBError from "../../common/exceptions/DatabaseError";

import * as workflowDao from "../daos/workflow.dao";
import BadRequestError from "../../common/exceptions/BadRequestError";
import errors from "../../common/constants/errors.constant";
import * as workflowInstanceDao from "../daos/workflowInstance.dao";

export async function insertWorkflow(workflowData: iWorkflowPayload) {
  try {
    const response = await workflowDao.insert(workflowData);

    return response;
  } catch (err: any) {
    if (
      err.name == errors.MONGO_SERVER_ERROR &&
      err.code == errors.MONGO_SERVER_ERROR_CODE
    ) {
      throw new DBError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }

    throw new Error(err.message);
  }
}

export async function getWorkflows(filter?: iWorkflowFilter) {
  let result = await workflowDao.find(filter);
  console.log(`reult: ${JSON.stringify(result, undefined, 2)}`);
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
    throw new BadRequestError(errorMessage);
  }

  return result;
}

export async function updateWorkflow(
  filter: iWorkflowFilter,
  data: iWorkflowPayload
) {
  const workflow = await workflowDao.find(filter);

  if (!workflow) {
    throw new BadRequestError(
      `Workflow with _wid: ${filter._id}, doesn't exist.`
    );
  }

  return await workflowDao.updateSingleWorkflow(filter, data);
}

export async function deleteWorkflow(filter: iWorkflowFilter) {
  const workflow = await workflowDao.find(filter);

  if (!workflow) {
    throw new BadRequestError(
      `Workflow with _wid: ${filter._id}, doesn't exist.`
    );
  }

  return await workflowDao.deleteSingleWorkflow(filter);
}
