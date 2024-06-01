"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionType = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "deposit";
    TransactionType["WITHDRAW"] = "withdraw";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
let Transaction = class Transaction extends typeorm_1.BaseEntity {
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: TransactionType }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Transaction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Transaction.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.transactions, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", Customer_1.Customer)
], Transaction.prototype, "customer", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)("transcation")
], Transaction);
