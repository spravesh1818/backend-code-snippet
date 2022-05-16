export interface iWorkflowInstancePayload {
    _wid: string;
    created_by: string; // id of the creator
    assignee_id: string;
    initiators: string;
    stagePermissions: { [stageOrdinality: string]: [string] };
}

export type stageStatus = 'INACTIVE' | 'INPROGRESS' | 'COMPLETE';

export interface iWorkflowUpdateInstancePayload {
    _id: string;
    _wid: string;
    created_by: string;
    assignee_id: string;
    currentStageNumber: number;
    stages: { [ordinality: string]: iWorkflowInstanceStage };
}

export interface iWorkflowInstanceStage {
    status: stageStatus;
    record: object;
}

export interface iWorkflowInstanceFilter {
    _id?: string | undefined;
    _wid?: string;
    single?: boolean;
}

export interface iWorkflowInstanceCountFilter {
    _wid?: string;
}
