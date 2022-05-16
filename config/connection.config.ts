import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import cred from './credentials';

dotenv.config();

const MONGO_URI = cred.mongoURI;
console.log(`The connection uri is: ${MONGO_URI}`);

const connectToMongoDb = () => {
    const connection = mongoose.connect(MONGO_URI);

    mongoose.connection.on('connected', () => {
        console.log('MongoDb connected.');
    });
    mongoose.connection.on('error', (err) => {
        console.log(`An error occurred. ERROR: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDb disconnected!');
    });

    return connection;
};

export default connectToMongoDb;
