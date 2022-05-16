import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as workflowService from '../services/workflow.service';

export async function createWorkflow(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const response = await workflowService.insertWorkflow(req.body);

        res.send({
            status: StatusCodes.OK,
            message: 'Workflow Successfully saved',
            data: response,
        });
    } catch (err) {
        next(err);
    }
}

export async function getWorkflows(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const response = await workflowService.getWorkflows();

        res.send({
            status: StatusCodes.OK,
            data: response,
        });
    } catch (err) {
        next(err);
    }
}

export async function getWorkflow(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.params.id;

        const response = await workflowService.getWorkflows({
            _id: id,
            single: true,
        });

        res.send({
            status: StatusCodes.OK,
            data: response,
        });
    } catch (err) {
        next(err);
    }
}

export async function updateWorkflow(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.params.id;
        const response = await workflowService.updateWorkflow(
            { _id: id },
            req.body
        );

        res.send({
            status: StatusCodes.OK,
            data: response,
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteWorkflow(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.params.id;

        const response = await workflowService.deleteWorkflow({ _id: id });

        res.send({
            status: StatusCodes.OK,
            data: response,
        });
    } catch (err) {
        next(err);
    }
}
