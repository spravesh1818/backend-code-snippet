import * as dotenv from "dotenv";
import mongoose from "mongoose";
import log from "loglevel";

import connection from "../Config/connection.config";
import Workflow from "../src/core/models/workflow.model";

dotenv.config();

const data = [
  {
    name: "workflow 1",
    created_by: 123,
    initiators: ["usera@gmail.com", "userb@gmail.com", "code.anwesh@gmail.com"],
    stages: [
      {
        name: "stage 1",
        description: "this is stage 1 workflow 1",
        ordinality: 1,
        fields: [
          {
            label: "first name",
            type: "text",
            constraints: {
              minLength: 5,
              maxLength: 10,
            },
          },
        ],
      },
      {
        name: "stage 2",
        description: "this is stage 1 workflow 2",
        ordinality: 2,
        fields: [
          {
            label: "second name",
            type: "text",
            constraints: {
              minLength: 5,
              maxLength: 10,
            },
          },
        ],
      },
    ],
  },
  {
    name: "workflow 2",
    created_by: 1234,
    initiators: [
      "userc@gmail.com",
      "userd@gmail.com",
      "mail.beezdev@gmail.com",
    ],
    stages: [
      {
        name: "stage n",
        description: "this is stage 1 workflow 2",
        ordinality: 1,
        fields: [
          {
            label: "first name",
            type: "text",
            constraints: {
              minLength: 5,
              maxLength: 10,
            },
          },
        ],
      },
      {
        name: "stage n1",
        description: "this is stage 2 workflow 2",
        ordinality: 2,
        fields: [
          {
            label: "second name",
            type: "text",
            constraints: {
              minLength: 5,
              maxLength: 10,
            },
          },
        ],
      },
    ],
  },
];

async function seedWorkflowCollection() {
  await connection();

  try {
    Workflow.collection.drop();
    Workflow.insertMany(data).then((result) => {
      log.info(`Seed successfull: \n ${result}`);
      mongoose.connection.close();
    });
  } catch (err) {
    log.error(err);
  }
}

seedWorkflowCollection();
