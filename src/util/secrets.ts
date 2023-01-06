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
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;
export const DB_LOGGING: any = process.env.DB_LOGGING || [];
export const DB_SYNC = Boolean(process.env.DB_SYNC) || false;

/**
 * JWT
 */
export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
export const JWT_EXPIRE_TIME = Number(process.env.JWT_EXPIRE_TIME);