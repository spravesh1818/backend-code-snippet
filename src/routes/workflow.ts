import { Router } from 'express';

import { schema } from '../utils/validate.utils';
import * as workflowController from '../core/controllers/workflow.controller';
import * as workflowValidation from '../middlewares/validators/workflow.validator';

import { authorizeStageUpdate } from '../middlewares/auth/authorizations/stage.authorize';
import authorizeInitiate from '../middlewares/auth/authorizations/initiate.authorize';

import * as workflowInstanceController from '../core/controllers/workflowInstance.controller';
import * as workflowInstanceValidation from '../middlewares/validators/workflowInstance.validator';

const router = Router();

/**
 * @swagger
 * /workflow/instances/{workflowId}/:
 *  get:
 *    tags:
 *      [Workflow-Instance]
 *    description: 'get all workflow-instances of particular workflow'
 *    parameters:
 *      - name: 'workflowId'
 *        in: 'path'
 *        required: true
 *        description: 'ID of workflow'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          data:
 *            type: 'object'
 *
 */
router.get(
    '/instances/:workflowId',
    workflowInstanceController.getWorkflowInstancesWithWid
);

/**
 * @swagger
 * /{workflowId}/instances:
 *  post:
 *    tags:
 *      [Workflow-Instance]
 *    description: 'Create new workflow instance'
 *    requestBody:
 *     description: Workflow instance payload
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          _wid:
 *           type: 'string'
 *          assignee_id:
 *            type: 'string'
 *          created_by:
 *            type: 'string'
 *            example:
 *              _wid: '6266c9af8bc756250fd6b3fa'
 *              assignee_id: '7266c9af8bc756250fd6b1aa'
 *              created_by: '5166c9af8bc756250fd6b1aa'
 *    responses:
 *      200:
 *       content:
 *        application/json:
 *         schema:
 *          type: 'object'
 *          properties:
 *           status:
 *             type: 'number'
 *             example: 200
 *           data:
 *            type: 'object'
 *            properties:
 *             _wid:
 *               type: 'number'
 *               example: 234299
 *             created_by:
 *               type: 'number'
 *               example: 2834
 *             assignee_id:
 *               type: 'number'
 *               example: 1234ef
 *             currentStageNumber:
 *               type: 'number'
 *               example: 0
 *             _id:
 *               type: 'number'
 *               example: 1234sfsda3
 *             createdAt:
 *               type: 'string'
 *               format: 'date-time'
 *             updatedAt:
 *               type: 'string'
 *               format: 'date-time'
 *             __v:
 *               type: 'number'
 */
router.post(
    '/instances',
    schema(workflowInstanceValidation.workflowInstanceCreationValidator),
    authorizeInitiate,
    workflowInstanceController.createWorkflowInstance
);

/**
 * @swagger
 * /{id}/instances:
 *  put:
 *    tags:
 *      [Workflow-Instance]
 *    description: 'Update Workflow instance based on the id'
 *    parameters:
 *      - name: 'id'
 *        in: 'path'
 *        required: true
 *        description: 'ID of the workflow instance'
 *    requestBody:
 *     description: payload to update data
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          _wid:
 *           type: 'string'
 *           example: 234234sdf2eeef
 *          assignee_id:
 *            type: 'string'
 *            example: 234234sdf2eeef
 *          currentStageNumber:
 *             type: 'number'
 *             example: 0
 *          created_by:
 *            type: 'string'
 *            example: 123423sdf23
 *          stages:
 *            type: object
 *            example:
 *              1:
 *                status: 'COMPLETE'
 *                record:
 *                  name: "new name"
 *                  age: "22"
 *                  sex: "male"
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          data:
 *           type: 'object'
 *           properties:
 *            acknowledged:
 *              type: 'boolean'
 *              example: true
 *            modifiedCount:
 *              type: 'number'
 *              example: 1
 *            upsertedId:
 *              type: 'string'
 *              nullable: true
 *              example: null
 *            upsertedCount:
 *              type: 'number'
 *              example: 0
 *            matchedCount:
 *              type: 'number'
 *              example: 1
 */
router.put(
    '/:id/instances',
    authorizeStageUpdate,
    workflowInstanceController.updateWorkflowInstance
);

/**
 * @swagger
 * /workflow/{workflowInstanceId}/instances/:
 *  get:
 *    tags:
 *      [Workflow-Instance]
 *    description: 'Get the workflow instances according to the instance_id'
 *    parameters:
 *      - name: 'workflowInstanceId'
 *        in: 'path'
 *        required: true
 *        description: 'ID of workflow-instance'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          data:
 *            type: 'object'
 *
 */
router.get('/:id/instances', workflowInstanceController.getWorkflowInstances);

router.delete(
    '/:id/instances',
    workflowInstanceController.deleteWorkflowInstance
);

/**
 * @swagger
 * /workflow/addWorkflow:
 *  post:
 *    tags:
 *      [Workflows]
 *    description: 'Save Workflow'
 *    requestBody:
 *     description: Workflow metadata and schema
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          created_by:
 *           type: 'number'
 *          workflowName:
 *            type: 'string'
 *          workflowSchema:
 *            type: 'object'
 *            example:
 *              fieldType: 'text'
 *              label: 'newField'
 *              constraint:
 *                min_value: 1
 *                max_value: 200
 *                field_type: 'numeric'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          message:
 *            type: 'string'
 *          data:
 *           type: 'object'
 *           properties:
 *            _wid:
 *              type: 'number'
 *              example: 234299
 *            created_by:
 *              type: 'number'
 *              example: 2834
 *            version:
 *              type: 'number'
 *              example: 1
 *            workflowName:
 *              type: 'string'
 *              example: 'myWorkflow'
 *            workflowSchema:
 *              type: 'object'
 *              example:
 *                fieldType: 'text'
 *                label: 'newField'
 *                constraint:
 *                  min_value: 1
 *                  max_value: 200
 *                  field_type: 'numeric'
 *            createdAt:
 *              type: 'string'
 *              format: 'date-time'
 *            updatedAt:
 *              type: 'string'
 *              format: 'date-time'
 *            __v:
 *              type: 'number'
 */
router.post(
    '/addWorkflow',
    schema(workflowValidation.workflowCreateValidator),
    workflowController.createWorkflow
);

/**
 * @swagger
 * /workflow/{workflowId}/:
 *  get:
 *    tags:
 *      [Workflows]
 *    description: 'Get the workflow according to the id'
 *    parameters:
 *      - name: 'workflowId'
 *        in: 'path'
 *        required: true
 *        description: 'ID of workflow'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          data:
 *            type: 'object'
 *            properties:
 *              _id:
 *                type: 'string'
 *                example: '623aea20b49d739a28ec075c'
 *              _wid:
 *                type: 'number'
 *                example: 3234223424
 *              created_by:
 *                type: 'number'
 *                example: 23423
 *              version:
 *                type: 'number'
 *                example: 1
 *              workflowName:
 *                type: 'string'
 *                example: 'myWorkflow'
 *              workflowSchema:
 *                type: 'object'
 *                example:
 *                  fieldType: 'text'
 *                  label: 'newField'
 *                  constraint:
 *                    min_value: 1
 *                    max_value: 200
 *                    field_type: 'numeric'
 *              createdAt:
 *                type: 'string'
 *                format: 'date-time'
 *              updatedAt:
 *                type: 'string'
 *                format: 'date-time'
 *              __v:
 *                type: 'number'
 */
router.get('/:id', workflowController.getWorkflow);

/**
 * @swagger
 * /workflow/{workflowId}:
 *  put:
 *    tags:
 *      [Workflows]
 *    description: 'Update Workflow based on the given id.'
 *    parameters:
 *      - name: 'workflowId'
 *        in: 'path'
 *        required: true
 *        description: 'ID of workflow'
 *    requestBody:
 *     description: Data to update
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          created_by:
 *           type: 'number'
 *          workflowName:
 *            type: 'string'
 *          workflowSchema:
 *            type: 'object'
 *            example:
 *              fieldType: 'text'
 *              label: 'newField'
 *              constraint:
 *                min_value: 1
 *                max_value: 200
 *                field_type: 'numeric'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          data:
 *           type: 'object'
 *           properties:
 *            acknowledged:
 *              type: 'boolean'
 *              example: true
 *            modifiedCount:
 *              type: 'number'
 *              example: 1
 *            upsertedId:
 *              type: 'string'
 *              nullable: true
 *              example: null
 *            upsertedCount:
 *              type: 'number'
 *              example: 0
 *            matchedCount:
 *              type: 'number'
 *              example: 1
 */
router.put('/:id', workflowController.updateWorkflow);

/**
 * @swagger
 * /workflow/{workflowId}/:
 *  delete:
 *    tags:
 *      [Workflows]
 *    description: 'Delete the workflow according to the id'
 *    parameters:
 *      - name: 'workflowId'
 *        in: 'path'
 *        required: true
 *        description: 'ID of workflow'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *            example: 200
 *          data:
 *            type: 'object'
 *            properties:
 *              acknowledged:
 *                type: 'boolean'
 *                example: true
 *              deletedCount:
 *                type: 'number'
 *                example: 1
 */
router.delete('/:id', workflowController.deleteWorkflow);

/**
 * @swagger
 * /workflow:
 *  get:
 *    tags:
 *      [Workflows]
 *    description: 'Get all available workflows'
 *    responses:
 *     200:
 *      content:
 *       application/json:
 *        schema:
 *         type: 'object'
 *         properties:
 *          status:
 *            type: 'number'
 *          data:
 *            type: array
 *            items:
 *              type: 'object'
 *              properties:
 *                id:
 *                  type: 'string'
 *                  example: 623aea20b49d739a28ec075c
 *                _wid:
 *                  type: 'number'
 *                  example: 23421
 *                created_by:
 *                  type: 'number'
 *                  example: 323
 *                version:
 *                  type: 'number'
 *                  example: 1
 *                workflowName:
 *                  type: 'string'
 *                  example: 'myworkflow'
 *                workflowSchema:
 *                  type: 'object'
 *                  example:
 *                    fieldType: 'text'
 *                    label: 'newField'
 *                    constraint:
 *                      min_value: 1
 *                      max_value: 200
 *                      field_type: 'numeric'
 *                __v:
 *                  type: number
 *                createdAt:
 *                  type: 'string'
 *                  format: 'date-time'
 *                updatedAt:
 *                  type: 'string'
 *                  format: 'date-time'
 */
router.get('/', workflowController.getWorkflows);

export default router;
