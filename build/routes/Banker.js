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
const express_1 = __importDefault(require("express"));
const datasource_1 = require("../config/datasource");
const Banker_1 = require("../entities/Banker");
const router = express_1.default.Router();
// Query banker data from database with customer relationships
router.get("/bankers", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankers = yield datasource_1.dataSource.getRepository(Banker_1.Banker).find({}); // Get repository from the initialized DataSource
        return res.status(200).json(bankers);
    }
    catch (error) {
        console.error("Error occurred while querying bankers:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while querying bankers." });
    }
}));
router.post("/bankers", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, firstname, lastname, card_number, employee_number, } = _req.body;
        const banker = Banker_1.Banker.create({
            username,
            email,
            password,
            firstname,
            lastname,
            card_number,
            employee_number,
        });
        yield banker.save();
        return res.status(200).json(banker);
    }
    catch (error) {
        return res.send(error);
    }
}));
exports.default = router;
