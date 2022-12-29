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
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../config/base.entity");
const laboratory_entity_1 = require("../../laboratory/entities/laboratory.entity");
const purchase_detail_entity_1 = require("../../purchase/entities/purchase_detail.entity");
let ProductEntity = class ProductEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "therapeutic_description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "expiration_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => laboratory_entity_1.LaboratoryEntity, (laboratory) => laboratory.products),
    (0, typeorm_1.JoinColumn)({ name: "laboratory_id" }),
    __metadata("design:type", laboratory_entity_1.LaboratoryEntity)
], ProductEntity.prototype, "laboratory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_detail_entity_1.PurchaseDetailEntity, (purchaseDetail) => purchaseDetail.product),
    __metadata("design:type", purchase_detail_entity_1.PurchaseDetailEntity)
], ProductEntity.prototype, "purchaseDetail", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "product" }),
    (0, typeorm_1.Unique)(["name"])
], ProductEntity);
exports.ProductEntity = ProductEntity;
