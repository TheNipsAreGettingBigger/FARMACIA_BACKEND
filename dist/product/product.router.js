"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const router_1 = require("../shared/router/router");
const product_controller_1 = require("./controllers/product.controller");
const product_middleware_1 = require("./middlewares/product.middleware");
class ProductRouter extends router_1.BaseRouter {
    constructor() {
        super(product_controller_1.ProductController, product_middleware_1.ProductMiddleware);
    }
    routes() {
        this.router.get("/products", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getProducts.bind(this.controller));
        this.router.get("/products/product/:id", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getProductById.bind(this.controller));
        this.router.get("/products/most-selled", [this.middleware.validateJWT.bind(this.middleware)], this.controller.getMostSelledProducts.bind(this.controller));
        this.router.get("/products/search", [this.middleware.validateJWT.bind(this.middleware)], this.controller.findProductsByName.bind(this.controller));
        this.router.post("/products/create", [
            this.middleware.validateJWT.bind(this.middleware),
            this.middleware.isAdminRole.bind(this.middleware),
            this.middleware.productValidator.bind(this.middleware)
        ], this.controller.createProduct.bind(this.controller));
        this.router.put("/products/update/:id", [this.middleware.validateJWT.bind(this.middleware), this.middleware.isAdminRole.bind(this.middleware)], this.controller.updateProduct.bind(this.controller));
        this.router.delete("/products/delete/:id", [this.middleware.validateJWT.bind(this.middleware), this.middleware.isAdminRole.bind(this.middleware)], this.controller.deleteProduct.bind(this.controller));
    }
}
exports.ProductRouter = ProductRouter;
