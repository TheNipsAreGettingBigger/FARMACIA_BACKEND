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
exports.LaboratoryController = void 0;
const http_response_1 = require("../../shared/response/http.response");
const laboratory_service_1 = require("../services/laboratory.service");
class LaboratoryController {
    constructor(laboratoryService = new laboratory_service_1.LaboratoryService(), httpResponse = new http_response_1.HttpResponse()) {
        this.laboratoryService = laboratoryService;
        this.httpResponse = httpResponse;
    }
    getLaboratories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.laboratoryService.findAll();
                if (data.length === 0) {
                    return this.httpResponse.NotFound(res, "No existe dato");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
    getLaboratoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.laboratoryService.findByID(id);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe dato");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    createLaboratory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.laboratoryService.create(req.body);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe dato");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    updateLaboratory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.laboratoryService.update(id, req.body);
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error en actualizar");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
}
exports.LaboratoryController = LaboratoryController;
