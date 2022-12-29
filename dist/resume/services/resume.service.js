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
exports.ResumeService = void 0;
const config_1 = require("../../config/config");
class ResumeService extends config_1.ConfigServer {
    constructor() {
        super();
        this.execRepository = this.initRepository();
    }
    initRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            const getConn = yield this.initConnect;
            return getConn.getRepository({});
        });
    }
    getResume() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.execRepository;
            const customers = repo.query(`SELECT COUNT(*) as Clientes FROM customer`);
            const employees = repo.query(`SELECT COUNT(*) as Empleados FROM employee`);
            const laboratories = repo.query(`SELECT COUNT(*) as Laboratorios FROM laboratory`);
            const products = repo.query(`SELECT COUNT(*) as Productos FROM product`);
            const purchases = repo.query(`SELECT COUNT(*) as Compras FROM purchase`);
            return Promise.all([customers, employees, laboratories, products, purchases]);
        });
    }
}
exports.ResumeService = ResumeService;
