import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_LOGGING, DB_SYNC } from '../util/secrets';
import { User } from '../entity/user';
import { Drug } from '../entity/drug';
import { Vaccination } from '../entity/vaccination';

const dbOptions: DataSourceOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [
        User,
        Drug,
        Vaccination
    ],
    logging: DB_LOGGING,
    synchronize: DB_SYNC
};

export const dataSource = new DataSource(dbOptions);