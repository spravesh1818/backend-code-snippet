import * as workflowService from "../src/core/services/workflow.service";
import {
  iWorkflowFilter,
  iWorkflowPayload,
} from "../src/common/dto/workflow.dto";

describe("Testing workflow", () => {
  test("Get Workflow List", () => {
    const workflows = workflowService.getWorkflows();
    expect(workflows).toBeInstanceOf([]);
  });

  test("Add a workflow", () => {
    const workflowData: iWorkflowPayload = {
      name: "workflow 1",
      created_by: 123,
      initiators: [
        "usera@gmail.com",
        "userb@gmail.com",
        "code.anwesh@gmail.com",
      ],
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
    };

    const workflowResponse = workflowService.insertWorkflow(workflowData);
    expect(workflowResponse).toBeInstanceOf(iWorkflowPayload);
  });
});
