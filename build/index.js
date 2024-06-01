"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const Customer_1 = __importDefault(require("./routes/Customer"));
const Banker_1 = __importDefault(require("./routes/Banker"));
const Transaction_1 = __importDefault(require("./routes/Transaction"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureMiddleware();
        this.CustomerRoutes();
        this.BankerRoutes();
        this.TransactionRoutes();
        this.setupDatabase();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
    }
    CustomerRoutes() {
        this.app.use("/api", Customer_1.default);
    }
    BankerRoutes() {
        this.app.use("/api", Banker_1.default);
    }
    TransactionRoutes() {
        this.app.use("/api", Transaction_1.default);
    }
    setupDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConfig = {
                type: "postgres",
                database: process.env.POSTGRES_DB,
                connection: {
                    host: process.env.POSTGRES_HOST,
                    port: parseInt(process.env.POSTGRES_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                }
            };
            const db = new database_1.Database(dbConfig);
            yield db.connect();
            // console.log('Database schema has been synchronized');
        });
    }
}
const port = 7338;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
