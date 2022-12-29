"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
// T controller
// U middleware
class BaseRouter {
    constructor(
    // una instancia de tipo T
    TController, UMiddleware) {
        this.router = (0, express_1.Router)();
        this.controller = new TController();
        this.middleware = new UMiddleware();
        this.routes();
    }
    // si convierto esta funcion a =>
    // entonces ya no funciona esto
    routes() { }
}
exports.BaseRouter = BaseRouter;
