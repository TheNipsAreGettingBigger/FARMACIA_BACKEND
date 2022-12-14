"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryMiddleware = void 0;
const laboratory_dto_1 = require("./../dtos/laboratory.dto");
const shared_middleware_1 = require("../../shared/middlewares/shared.middleware");
const class_validator_1 = require("class-validator");
class LaboratoryMiddleware extends shared_middleware_1.SharedMiddleware {
    constructor() {
        super();
    }
    laboraryValidator(req, res, next) {
        const { address, description, name, lat, lng } = req.body;
        const valid = new laboratory_dto_1.LaboratoryDTO();
        valid.name = name;
        valid.address = address;
        valid.description = description;
        valid.lat = lat;
        valid.lng = lng;
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
exports.LaboratoryMiddleware = LaboratoryMiddleware;
