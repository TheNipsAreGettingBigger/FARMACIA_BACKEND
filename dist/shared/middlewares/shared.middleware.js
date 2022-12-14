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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMiddleware = void 0;
const employee_service_1 = require("./../../employee/services/employee.service");
const config_1 = require("../../config/config");
const http_response_1 = require("../response/http.response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employee_dto_1 = require("../../employee/dtos/employee.dto");
class SharedMiddleware extends config_1.ConfigServer {
    constructor(httpResponse = new http_response_1.HttpResponse(), employeeService = new employee_service_1.EmployeeService()) {
        super();
        this.httpResponse = httpResponse;
        this.employeeService = employeeService;
    }
    validateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const headerToken = req.headers.authorization;
            if (!headerToken)
                return this.httpResponse.Unauthorized(res, "Token es requerido");
            const token = headerToken.replace("Bearer ", "");
            try {
                // decode vs verify ???
                const { sub } = jsonwebtoken_1.default.verify(token, this.getEnvironment("JWT_SECRET"));
                const authenticatedEmployee = yield this.employeeService.findByID(sub);
                if (!authenticatedEmployee)
                    throw new Error("El usuario authenticado es incorrecto");
                req.auth = authenticatedEmployee;
                next();
            }
            catch (err) {
                return this.httpResponse.Unauthorized(res, `Token no valido ${err.message}`);
            }
        });
    }
    isAdminRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.auth)
                return this.httpResponse.Error(res, "Se esta verificando el rol sin validar el JWT");
            const { role } = req.auth;
            if (role != employee_dto_1.RoleType.ADMIN)
                return this.httpResponse.Unauthorized(res, "El employee authenticado no tiene permisos para esta acción");
            next();
        });
    }
}
exports.SharedMiddleware = SharedMiddleware;
