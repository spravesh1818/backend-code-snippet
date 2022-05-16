export interface WorkflowPayload {
  name: string;
  isActive: boolean;
  created_by: number;
  initiators: [string];
  stage: [WorkflowStage];
}

export interface WorkflowStage {
  name: string;
  description: string;
  ordinality: number;
  fields: [object];
}

export interface WorkflowFilter {
  _id: string;
  single?: boolean;
}
