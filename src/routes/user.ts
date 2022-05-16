import { Router } from 'express';

import { schema } from '../utils/validate.utils';
import * as userController from '../core/controllers/user.controller';
import userValidator from '../middlewares/validators/user.validator';

const router = Router();

/**
 * @swagger
 * /users/:
 *  post:
 *    tags:
 *      [Users]
 *    description: 'Save records containing user data'
 *    requestBody:
 *     description: User data
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          data:
 *            type: object
 *            properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
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
 *            _id:
 *              type: 'number'
 *              example: 234299
 *            name:
 *              type: 'string'
 *            email:
 *              type: 'string'
 *            createdAt:
 *              type: 'string'
 *              format: 'date-time'
 *            updatedAt:
 *              type: 'string'
 *              format: 'date-time'
 *            __v:
 *              type: 'number'
 */
router.post('/', schema(userValidator), userController.addUser);

/**
 * @swagger
 * /users/:
 *  get:
 *    tags:
 *      [Users]
 *    description: 'Get All Users'
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
 *           type: array
 *           items:
 *              type: 'object'
 *              properties:
 *                  _id:
 *                    type: 'number'
 *                    example: 234299
 *                  name:
 *                     type: 'string'
 *                  email:
 *                      type: 'string'
 *                  createdAt:
 *                      type: 'string'
 *                      format: 'date-time'
 *                  updatedAt:
 *                      type: 'string'
 *                      format: 'date-time'
 *                  __v:
 *                      type: 'number'
 */
router.get('/', userController.getUsers);

export default router;
