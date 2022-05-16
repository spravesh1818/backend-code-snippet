import Joi from 'joi';

const workflowStageJoiSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ordinality: Joi.number().required(),
    fields: Joi.array().items(Joi.object().required()).min(1),
}).required();

/**
 * Validator for Workflow Creation schema.
 */
export const workflowCreateValidator = Joi.object({
    name: Joi.string().required().label('Name'),
    isActive: Joi.boolean().label('IsActive'),
    created_by: Joi.number().required().label('CreatedBy'),
    initiators: Joi.array().items(Joi.string()).label('Initiators'),
    stages: Joi.array().items(workflowStageJoiSchema),
});
