"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const base_service_1 = require("../../config/base.service");
const customer_entity_1 = require("../entities/customer.entity");
class CustomerService extends base_service_1.BaseService {
    constructor() {
        super(customer_entity_1.CustomerEntity);
    }
}
exports.CustomerService = CustomerService;
