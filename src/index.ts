import 'dotenv/config';
import express, { Application } from "express";
import { Database, DatabaseConfig } from "./config/database";
import { dataSource } from './config/datasource'; // Ensure this line is included

import CustomerRoutes from './routes/Customer';
import BankerRoutes from './routes/Banker';
import TransactionRoutes from './routes/Transaction';


class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.CustomerRoutes();
        this.BankerRoutes();
        this.TransactionRoutes();
        this.setupDatabase();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
    }

    private CustomerRoutes(): void {
        this.app.use("/api", CustomerRoutes);
    }

    private BankerRoutes(): void {
        this.app.use("/api", BankerRoutes);
    }
    private TransactionRoutes(): void {
        this.app.use("/api", TransactionRoutes);
    }

    private async setupDatabase(): Promise<void> {
        const dbConfig: DatabaseConfig = {
            type: "postgres",
            database: process.env.POSTGRES_DB as string,
            connection: {
                host: process.env.POSTGRES_HOST as string,
                port: parseInt(process.env.POSTGRES_PORT as string),
                username: process.env.POSTGRES_USER as string,
                password: process.env.POSTGRES_PASSWORD as string,
            }
        };

        const db = new Database(dbConfig);
        await db.connect();

        // console.log('Database schema has been synchronized');
    }
}

const port: number = 7338;
const app = new App().app;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
