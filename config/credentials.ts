import * as dotenv from 'dotenv';

dotenv.config();

const mongoConnection = {
    mongoURI: process.env.CONNECTION_URL || '',
    databaseName: process.env.DATABASE,
};

export default mongoConnection;
