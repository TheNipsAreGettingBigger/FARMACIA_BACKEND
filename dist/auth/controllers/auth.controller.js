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
exports.AuthController = void 0;
const http_response_1 = require("../../shared/response/http.response");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor(authService = new auth_service_1.AuthService(), httpResponse = new http_response_1.HttpResponse()) {
        this.authService = authService;
        this.httpResponse = httpResponse;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeEncode = req.employee;
                const encode = yield this.authService.generateJWT(employeeEncode);
                res.header("Content-Type", "application/json");
                res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
                res.write(JSON.stringify(Object.assign(Object.assign({}, encode), { ok: true })));
                res.end();
            }
            catch (error) {
                return this.httpResponse.Error(res, error.message);
            }
        });
    }
    checking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeEncode = req.auth;
            return this.httpResponse.Ok(res, employeeEncode);
        });
    }
}
exports.AuthController = AuthController;
