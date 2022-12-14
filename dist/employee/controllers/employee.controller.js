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
exports.EmployeeController = void 0;
const http_response_1 = require("../../shared/response/http.response");
const employee_service_1 = require("../services/employee.service");
class EmployeeController {
    constructor(httpResponse = new http_response_1.HttpResponse(), employeeService = new employee_service_1.EmployeeService()) {
        this.httpResponse = httpResponse;
        this.employeeService = employeeService;
        this.getEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.employeeService.findAll();
                if (!users.length)
                    return this.httpResponse.NotFound(res, "No existen empleados registrados");
                return this.httpResponse.Ok(res, users);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
        this.getEmployeeById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.employeeService.findByID(id);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe el empleado con el id " + id);
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.employeeService.create(req.body);
                delete data.password;
                return this.httpResponse.Ok(res, data);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.employeeService.update(id, req.body);
                if (!data.affected)
                    return this.httpResponse.NotFound(res, "Error al actualizar");
                return this.httpResponse.Ok(res, data);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.employeeService.delete(id);
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error en borrar");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
