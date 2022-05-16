export interface iWorkflowPayload {
    name: string;
    isActive: boolean;
    created_by: number;
    initiators: [string];
    stage: [iWorkflowStage];
}

export interface iWorkflowStage {
    name: string;
    description: string;
    ordinality: number;
    fields: [object];
}

export interface iWorkflowFilter {
    _id: string;
    single?: boolean;
}
