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
exports.PurchaseDetailService = void 0;
const base_service_1 = require("../../config/base.service");
const purchase_detail_entity_1 = require("../entities/purchase_detail.entity");
class PurchaseDetailService extends base_service_1.BaseService {
    constructor() {
        super(purchase_detail_entity_1.PurchaseDetailEntity);
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
    getAllReferencedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository)
                .query(`
      SELECT sum(pd.quantity_product) AS vendido,p.name AS name,p.price AS precio 
        FROM purchase_detail AS pd 
        INNER JOIN product AS p ON p.id = pd.product_id GROUP BY pd.product_id ORDER BY vendido DESC
    `);
        });
    }
}
exports.PurchaseDetailService = PurchaseDetailService;
