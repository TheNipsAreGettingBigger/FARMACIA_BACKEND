"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRouter = void 0;
const purchase_controller_1 = require("./controllers/purchase.controller");
const router_1 = require("../shared/router/router");
const purchase_middleware_1 = require("./middlewares/purchase.middleware");
class PurchaseRouter extends router_1.BaseRouter {
    constructor() {
        super(purchase_controller_1.PurchaseController, purchase_middleware_1.PurchaseMiddleware);
    }
    routes() {
        this.router.post("/purchase/generate", [this.middleware.validateJWT.bind(this.middleware)], this.controller.generatePurchase.bind(this.controller));
    }
}
exports.PurchaseRouter = PurchaseRouter;
