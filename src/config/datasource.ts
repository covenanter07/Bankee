import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Banker } from '../entities/Banker';
import { Customer } from '../entities/Customer';
import { Transaction } from '../entities/Transaction';

config();

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL, 
    logging: false,
    entities: [Banker, Customer, Transaction],
    ssl: {
    rejectUnauthorized: false, // Render 需要啟用 SSL 來連接 PostgreSQL
    },
    migrations: [],
    subscribers: [],
  });
