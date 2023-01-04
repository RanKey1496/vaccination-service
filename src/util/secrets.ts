import dotenv from 'dotenv';
import fs from 'fs';

function getEnvironment(path: string, env: string) {
    if (fs.existsSync(path)) {
        console.log(`Using ${env} environment variables`);
        dotenv.config({ path });
    } else {
        console.error(`Can't load ${env} ${path} variables`);
        process.exit(1);
    }
}

export const ENVIRONMENT = process.env.NODE_ENV;

if (ENVIRONMENT === 'production') {
    getEnvironment('.env', ENVIRONMENT);
} else {
    if (ENVIRONMENT === 'test') {
        getEnvironment('.env.test', ENVIRONMENT);
    } else {
        getEnvironment('.env.dev', 'development');
    }
}

/**
 * Database
 */
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;
export const DB_LOGGING = process.env.DB_LOGGING;
export const DB_SYNC = process.env.DB_SYNC;

/**
 * JWT
 */
export const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;