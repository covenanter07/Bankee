import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Banker } from '../entities/Banker';
import { Customer } from '../entities/Customer';
import { Transaction } from '../entities/Transaction';

config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Banker, Customer, Transaction], // Add all your entities here
    synchronize: true, // Set to false in production
});
