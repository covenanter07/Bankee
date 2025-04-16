"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const datasource_1 = require("./config/datasource");
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
}
const port = 7338;
datasource_1.dataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    const app = new App().app;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((err) => {
    console.error("Error occurred during Data Source initialization:", err);
});
