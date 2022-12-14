"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const router_1 = require("../shared/router/router");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_middlewares_1 = require("./middlewares/auth.middlewares");
class AuthRouter extends router_1.BaseRouter {
    constructor() {
        super(auth_controller_1.AuthController, auth_middlewares_1.AuthMiddleware);
    }
    routes() {
        this.router.post("/login", [this.middleware.validateRequest.bind(this.middleware)], this.controller.login.bind(this.controller));
        this.router.post("/auth/check", [
            this.middleware.validateJWT.bind(this.middleware)
        ], this.controller.checking.bind(this.controller));
    }
}
exports.AuthRouter = AuthRouter;
