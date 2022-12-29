"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeRouter = void 0;
const shared_middleware_1 = require("../shared/middlewares/shared.middleware");
const router_1 = require("../shared/router/router");
const resume_controller_1 = require("./controllers/resume.controller");
class ResumeRouter extends router_1.BaseRouter {
    constructor() {
        super(resume_controller_1.ResumeController, shared_middleware_1.SharedMiddleware);
    }
    routes() {
        this.router.get("/resume", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getResume.bind(this.controller));
    }
}
exports.ResumeRouter = ResumeRouter;
