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
exports.ResumeController = void 0;
const resume_service_1 = require("../services/resume.service");
const http_response_1 = require("../../shared/response/http.response");
const utils_1 = require("../../utils");
class ResumeController {
    constructor(resumeService = new resume_service_1.ResumeService(), httpResponse = new http_response_1.HttpResponse()) {
        this.resumeService = resumeService;
        this.httpResponse = httpResponse;
    }
    getResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.resumeService.getResume();
                const d = data.reduce((acc, curr) => {
                    return Object.assign(Object.assign({}, acc), curr[0]);
                }, {});
                const empty = (0, utils_1.isObjectEmpty)(d);
                if (empty) {
                    return this.httpResponse.Error(res, "Error de coherencia");
                }
                return this.httpResponse.Ok(res, d);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
}
exports.ResumeController = ResumeController;
