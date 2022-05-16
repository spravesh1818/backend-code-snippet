import appConfig from './app.configs';
import swaggerJsDoc from 'swagger-jsdoc';

const definition = {
    openapi: '3.0.2',
    info: {
        title: 'Vyaguta Workflow Api',
        version: '1.0.0',
        description: 'Api documentation for Vyaguta workflow web app.',
    },
    schemas: ['https'],
    host: `${appConfig.host}:${appConfig.port}`,
    servers: [{ url: `/api` }],
    components: {
        schemas: {
            Record: {
                type: 'object',
                properties: {
                    _wid: { type: 'number' },
                    created_by: { type: 'number' },
                    data: { type: 'object' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            Workflow: {
                type: 'object',
                properties: {
                    _wid: { type: 'number' },
                    created_by: { type: 'number' },
                    version: { type: 'number' },
                    workflowName: { type: 'string' },
                    workflowSchema: { type: 'object' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
};

export const options = {
    definition,
    apis: ['src/routes/*.ts'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;
