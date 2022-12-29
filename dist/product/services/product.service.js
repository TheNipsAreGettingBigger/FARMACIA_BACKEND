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
exports.ProductService = void 0;
const base_service_1 = require("../../config/base.service");
const product_entity_1 = require("../entities/product.entity");
class ProductService extends base_service_1.BaseService {
    constructor() {
        super(product_entity_1.ProductEntity);
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).save(body);
        });
    }
    update(id, infoUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).update(id, infoUpdate);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository)
                .createQueryBuilder("product")
                .innerJoinAndSelect("product.laboratory", "laboratory")
                .where("product.name like :name", {
                name: `%${name}%`,
            })
                .getMany();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).find({
                relations: {
                    laboratory: true
                }
            });
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).createQueryBuilder("product")
                .innerJoinAndSelect("product.laboratory", "laboratory")
                .where("product.id like :id", {
                id,
            })
                .getOne();
        });
    }
    verifyProduct(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).query(`
      SELECT id,name,price,${quantity} as quantity,CONVERT(${quantity}*stock,INT) as total FROM product WHERE id = '${id}' AND stock - ${quantity} > 0
    `);
        });
    }
    updateStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).createQueryBuilder("product")
                .update()
                .set({
                stock: () => `stock - ${quantity}`
            })
                .where("id = :id", { id })
                .execute();
        });
    }
}
exports.ProductService = ProductService;
