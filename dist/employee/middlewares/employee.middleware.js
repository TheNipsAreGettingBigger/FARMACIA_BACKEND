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
exports.EmployeeMiddleware = void 0;
const class_validator_1 = require("class-validator");
const shared_middleware_1 = require("../../shared/middlewares/shared.middleware");
const employee_dto_1 = require("../dtos/employee.dto");
class EmployeeMiddleware extends shared_middleware_1.SharedMiddleware {
    constructor() {
        super();
    }
    employeeValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, age, email, dni, role, password, username } = req.body;
            const valid = new employee_dto_1.EmployeeDTO();
            valid.firstname = firstname;
            valid.lastname = lastname;
            valid.username = username;
            valid.email = email;
            valid.password = password;
            valid.age = age;
            valid.role = role;
            valid.dni = dni;
            const error = yield (0, class_validator_1.validate)(valid);
            if (!error.length)
                return next();
            return this.httpResponse.Error(res, error);
        });
    }
}
exports.EmployeeMiddleware = EmployeeMiddleware;
