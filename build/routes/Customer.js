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
const Customer_1 = require("../entities/Customer");
const Transaction_1 = require("../entities/Transaction");
const router = express_1.default.Router();
router.use(express_1.default.json()); // Middleware to parse JSON bodies
// select firstname, balance
router.get("/customer", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield datasource_1.dataSource
            .getRepository(Customer_1.Customer)
            .createQueryBuilder("customer")
            .select(["customer.firstname", "customer.balance"])
            .leftJoinAndSelect("customer.transactions", "transactions")
            .getMany();
        return res.status(200).json(customers);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.post("/customer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, firstname, lastname, card_number } = req.body;
        const customer = Customer_1.Customer.create({
            username,
            email,
            password,
            firstname,
            lastname,
            card_number,
        });
        yield customer.save();
        return res.status(201).json(customer);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.post("/customer/:customerId/transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const { type, amount } = req.body;
        const customer = yield Customer_1.Customer.findOneBy({ id: parseInt(customerId) });
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        const transaction = Transaction_1.Transaction.create({
            type,
            amount,
            customer,
        });
        yield transaction.save();
        if (type === Transaction_1.TransactionType.DEPOSIT) {
            customer.balance = customer.balance + amount;
        }
        else if (type === Transaction_1.TransactionType.WITHDRAW) {
            customer.balance = customer.balance - amount;
        }
        yield customer.save();
        return res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.delete("/customer/:customerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const response = yield Customer_1.Customer.delete(parseInt(customerId));
        return res.json({ msg: "deleted customer successfully...!" });
    }
    catch (error) {
        return res.send(error);
    }
}));
exports.default = router;
