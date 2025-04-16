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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
class Database {
    constructor(config) {
        this.dataSource = new typeorm_1.DataSource({
            type: config.type,
            database: config.database,
            host: config.connection.host,
            port: config.connection.port,
            username: config.connection.username,
            password: config.connection.password,
            entities: [__dirname + "/../entities/*{.js,.ts}"], // Add your entities
            synchronize: true, // Set to false in production
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dataSource.initialize();
                console.log("PostgreSQL connected successfully.");
            }
            catch (err) {
                console.error("Not connected to PostgreSQL database:", err);
            }
        });
    }
}
exports.Database = Database;
