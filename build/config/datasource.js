"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const Banker_1 = require("../entities/Banker");
const Customer_1 = require("../entities/Customer");
const Transaction_1 = require("../entities/Transaction");
(0, dotenv_1.config)();
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Banker_1.Banker, Customer_1.Customer, Transaction_1.Transaction], // Add all your entities here
    synchronize: true, // Set to false in production
});
exports.dataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error occurred during Data Source initialization:", err);
});
