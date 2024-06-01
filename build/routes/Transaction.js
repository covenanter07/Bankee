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
const Banker_1 = require("../entities/Banker");
const Customer_1 = require("../entities/Customer");
const router = express_1.default.Router();
router.use(express_1.default.json()); // Middleware to parse JSON bodies
// Create Query transaction
router.get('/transaction', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.send('Query all transactions from database');
    }
    catch (error) {
        return res.send(error);
    }
}));
router.put('/banker/:bankId/customer/:customerId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bankId, customerId } = req.params;
        //Customer 's transaction
        const customer = yield Customer_1.Customer.findOneBy({ id: parseInt(customerId) });
        //Banker create customer 's transaction
        const banker = yield Banker_1.Banker.findOneBy({ id: parseInt(bankId) });
        if (!banker || !customer) {
            return res.status(400).json({
                msg: "banker or customer not found..."
            });
        }
        banker.customers = [
            customer
        ];
        yield banker.save();
        return res.status(200).json({
            msg: 'Link banker to customer successfully'
        });
    }
    catch (error) {
        return res.send(error);
    }
}));
exports.default = router;
