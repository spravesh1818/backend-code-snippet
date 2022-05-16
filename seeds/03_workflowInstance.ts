import * as dotenv from "dotenv";
import mongoose from "mongoose";
import log from "loglevel";

import connection from "../Config/connection.config";
import WorkflowInstance from "../src/core/models/workflowInstance.model";
import { workflowStageStatus } from "../src/common/constants/workflowInstance.constant";

dotenv.config();

const data = [
  {
    _wid: "RANDOM_WID_1",
    assignee_id: "234",
    created_by: "2342",
    currentStageNumber: 0,
    stages: {
      "1": {
        status: workflowStageStatus.INPROGRESS,
        record_id: "INEXISTENT_ID_1",
      },
      "2": {
        status: workflowStageStatus.INPROGRESS,
        record_id: "INEXISTENT_ID_2",
      },
      "3": {
        status: workflowStageStatus.INACTIVE,
        record_id: "INEXISTENT_ID_3",
      },
    },
    stagePermissions: {
      "1": ["usera@gmail.com", "userb@gmail.com"],
      "2": ["userb@gmail.com", "userc@gmail.com"],
      "3": ["userc@gmail.com"],
    },
  },
  {
    _wid: "RANDOM_WID_2",
    assignee_id: "233",
    created_by: "2343",
    currentStageNumber: 0,
    stages: {
      "1": {
        status: workflowStageStatus.INACTIVE,
        record_id: "INEXISTENT_ID_4",
      },
      "2": {
        status: workflowStageStatus.INACTIVE,
        record_id: "INEXISTENT_ID_5",
      },
      "3": {
        status: workflowStageStatus.INACTIVE,
        record_id: "INEXISTENT_ID_6",
      },
    },
    stagePermissions: {
      "1": ["userd@gmail.com", "usere@gmail.com"],
      "2": ["usere@gmail.com"],
      "3": ["userf@gmail.com"],
    },
  },
];

async function seedWorkflowInstanceCollection() {
  await connection();

  try {
    WorkflowInstance.collection.drop();
    WorkflowInstance.insertMany(data).then((result) => {
      log.info(`Seed successfull: \n ${result}`);
      mongoose.connection.close();
    });
  } catch (err: any) {
    log.error(err.stack);
  }
}

seedWorkflowInstanceCollection();
