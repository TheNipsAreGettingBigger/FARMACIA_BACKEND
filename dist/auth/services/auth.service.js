"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const employee_service_1 = require("../../employee/services/employee.service");
const bcrypt = __importStar(require("bcrypt"));
class AuthService extends config_1.ConfigServer {
    constructor(employeeService = new employee_service_1.EmployeeService(), jwtInstance = jwt) {
        super();
        this.employeeService = employeeService;
        this.jwtInstance = jwtInstance;
        this.sign = (payload, secret, expires) => {
            return this.jwtInstance.sign(payload, secret, { expiresIn: expires });
        };
        this.generateJWT = (employee) => __awaiter(this, void 0, void 0, function* () {
            const userConsult = yield this.employeeService.findEmployeeWithRole(employee.id, employee.role);
            const payload = {
                role: userConsult.role,
                sub: userConsult.id
            };
            delete employee.password;
            return {
                accessToken: this.sign(payload, this.getEnvironment("JWT_SECRET"), "24h"),
                employee
            };
        });
        this.validateEmployee = (usernameOrEmail, password) => __awaiter(this, void 0, void 0, function* () {
            const employeeByEmail = yield this.employeeService.findByEmail(usernameOrEmail);
            const employeeByUsername = yield this.employeeService.findByUsername(usernameOrEmail);
            if (!employeeByEmail && !employeeByUsername)
                return null;
            const employee = employeeByEmail !== null && employeeByEmail !== void 0 ? employeeByEmail : employeeByUsername;
            const isMatch = yield bcrypt.compare(password, employee.password);
            return !isMatch ? null : employee;
        });
    }
}
exports.AuthService = AuthService;
