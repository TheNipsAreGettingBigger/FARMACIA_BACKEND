"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseMiddleware = void 0;
const class_validator_1 = require("class-validator");
const shared_middleware_1 = require("../../shared/middlewares/shared.middleware");
const purchase_dto_1 = require("../dtos/purchase.dto");
class PurchaseMiddleware extends shared_middleware_1.SharedMiddleware {
    constructor() {
        super();
    }
    purchaseValidator(req, res, next) {
        const { description, paymentMethod, customer, amount, employee } = req.body;
        const valid = new purchase_dto_1.PurchaseDTO();
        valid.paymentMethod = paymentMethod;
        valid.description = description;
        valid.customer = customer;
        valid.employee = employee;
        valid.amount = amount;
        (0, class_validator_1.validate)(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            }
            else {
                next();
            }
        });
    }
}
exports.PurchaseMiddleware = PurchaseMiddleware;
