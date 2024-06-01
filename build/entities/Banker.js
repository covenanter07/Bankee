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
exports.Banker = void 0;
const typeorm_1 = require("typeorm");
const Personal_1 = require("./utils/Personal");
const Customer_1 = require("./Customer");
let Banker = class Banker extends Personal_1.Personal {
};
exports.Banker = Banker;
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Banker.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 10 }),
    __metadata("design:type", String)
], Banker.prototype, "employee_number", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Customer_1.Customer, {
        cascade: true
    }),
    (0, typeorm_1.JoinTable)({
        name: 'banker_customer',
        joinColumn: {
            name: 'banker',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'customer',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], Banker.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Banker.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Banker.prototype, "updated_at", void 0);
exports.Banker = Banker = __decorate([
    (0, typeorm_1.Entity)('banker')
], Banker);
