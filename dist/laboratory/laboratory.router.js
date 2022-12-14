"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryRouter = void 0;
const laboratory_middleware_1 = require("./middlewares/laboratory.middleware");
const laboratory_controller_1 = require("./controllers/laboratory.controller");
const router_1 = require("../shared/router/router");
class LaboratoryRouter extends router_1.BaseRouter {
    constructor() {
        super(laboratory_controller_1.LaboratoryController, laboratory_middleware_1.LaboratoryMiddleware);
    }
    routes() {
        this.router.get("/laboratories", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getLaboratories.bind(this.controller));
        this.router.get("/laboratories/laboratory/:id", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getLaboratoryById.bind(this.controller));
        this.router.post("/laboratories/create", [
            this.middleware.validateJWT.bind(this.middleware),
            this.middleware.isAdminRole.bind(this.middleware),
            this.middleware.laboraryValidator.bind(this.middleware)
        ], this.controller.createLaboratory.bind(this.controller));
        this.router.put("/laboratories/update/:id", [
            this.middleware.validateJWT.bind(this.middleware),
            this.middleware.isAdminRole.bind(this.middleware)
        ], this.controller.updateLaboratory.bind(this.controller));
    }
}
exports.LaboratoryRouter = LaboratoryRouter;
