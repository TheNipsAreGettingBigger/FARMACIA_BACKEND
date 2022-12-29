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
exports.AuthMiddleware = void 0;
const shared_middleware_1 = require("../../shared/middlewares/shared.middleware");
const auth_service_1 = require("../services/auth.service");
class AuthMiddleware extends shared_middleware_1.SharedMiddleware {
    constructor(authService = new auth_service_1.AuthService()) {
        super();
        this.authService = authService;
    }
    validateRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const employee = yield this.authService.validateEmployee(username, password);
                if (!employee)
                    return this.httpResponse.NotFound(res, "username y/o password incorrectos");
                req.employee = employee;
                next();
            }
            catch (err) {
                return this.httpResponse.Error(res, err.message);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
