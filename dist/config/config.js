"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data.source");
class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv_1.default.config({
            path: nodeNameEnv
        });
    }
    getEnvironment(name) {
        return process.env[name];
    }
    getNumberEnv(name) {
        return Number(this.getEnvironment(name));
    }
    get nodeEnv() {
        var _a;
        return ((_a = this.getEnvironment("NODE_ENV")) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        // return this.getEnvironment("NODE_ENV")?.trim() || "development"
    }
    createPathEnv(path) {
        const arrEnv = ["env"];
        if (path.length > 0) {
            const stringToArray = path.split(".");
            arrEnv.unshift(...stringToArray);
        }
        return `.${arrEnv.join(".")}`;
    }
    get initConnect() {
        return data_source_1.AppDataSource.initialize();
    }
}
exports.ConfigServer = ConfigServer;
