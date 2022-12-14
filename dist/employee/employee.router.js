"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRouter = void 0;
const router_1 = require("../shared/router/router");
const employee_controller_1 = require("./controllers/employee.controller");
const employee_middleware_1 = require("./middlewares/employee.middleware");
class EmployeeRouter extends router_1.BaseRouter {
    constructor() {
        super(employee_controller_1.EmployeeController, employee_middleware_1.EmployeeMiddleware);
    }
    routes() {
        this.router.post("/employees/create", [
            this.middleware.validateJWT.bind(this.middleware),
            this.middleware.isAdminRole.bind(this.middleware),
            this.middleware.employeeValidator.bind(this.middleware)
        ], this.controller.create.bind(this.controller));
        this.router.get("/employees", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getEmployees.bind(this.controller));
    }
}
exports.EmployeeRouter = EmployeeRouter;
