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
exports.ProductController = void 0;
const purchase_detail_service_1 = require("../../purchase/services/purchase-detail.service");
const http_response_1 = require("../../shared/response/http.response");
const product_service_1 = require("../services/product.service");
class ProductController {
    constructor(productService = new product_service_1.ProductService(), httpResponse = new http_response_1.HttpResponse(), purchaseDetailService = new purchase_detail_service_1.PurchaseDetailService()) {
        this.productService = productService;
        this.httpResponse = httpResponse;
        this.purchaseDetailService = purchaseDetailService;
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.productService.findAll();
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
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.productService.findByID(id);
                if (!data) {
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
    findProductsByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.query;
            try {
                if (search !== undefined) {
                    const data = yield this.productService.findByName(search);
                    if (!data) {
                        return this.httpResponse.NotFound(res, "No existe dato");
                    }
                    return this.httpResponse.Ok(res, data);
                }
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.productService.create(req.body);
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
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.productService.update(id, req.body);
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
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entre');
            const { id } = req.params;
            try {
                const data = yield this.productService.delete(id);
                if (!data.affected) {
                    console.log(data);
                    return this.httpResponse.NotFound(res, "Hay un error en borrar");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    getMostSelledProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.purchaseDetailService.getAllReferencedProducts();
                if (!data)
                    return this.httpResponse.NotFound(res, "No existe dato");
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
}
exports.ProductController = ProductController;
