"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMiddleware = void 0;
const class_validator_1 = require("class-validator");
const shared_middleware_1 = require("../../shared/middlewares/shared.middleware");
const product_dto_1 = require("../dtos/product.dto");
class ProductMiddleware extends shared_middleware_1.SharedMiddleware {
    constructor() {
        super();
    }
    productValidator(req, res, next) {
        const { name, stock, price, expiration_date, therapeutic_description, laboratory } = req.body;
        const valid = new product_dto_1.ProductDTO();
        valid.name = name;
        valid.stock = stock;
        valid.expiration_date = expiration_date;
        valid.price = price;
        valid.therapeutic_description = therapeutic_description;
        valid.laboratory = laboratory;
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
exports.ProductMiddleware = ProductMiddleware;
