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
exports.PurchaseController = void 0;
const product_service_1 = require("../../product/services/product.service");
const http_response_1 = require("../../shared/response/http.response");
const purchase_service_1 = require("../services/purchase.service");
const purchase_detail_service_1 = require("../services/purchase-detail.service");
const customer_service_1 = require("../../customer/services/customer.service");
class PurchaseController {
    constructor(purchaseService = new purchase_service_1.PurchaseService(), httpResponse = new http_response_1.HttpResponse(), productService = new product_service_1.ProductService(), purchaseDetailService = new purchase_detail_service_1.PurchaseDetailService(), customerService = new customer_service_1.CustomerService()) {
        this.purchaseService = purchaseService;
        this.httpResponse = httpResponse;
        this.productService = productService;
        this.purchaseDetailService = purchaseDetailService;
        this.customerService = customerService;
    }
    getPurchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.purchaseService.findAll();
                if (data.length === 0) {
                    return this.httpResponse.NotFound(res, "No hay ventas registradas");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
    getPurchaseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.purchaseService.findByID(id);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe la venta");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
    createPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.purchaseService.create(req.body);
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
    updatePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.purchaseService.update(id, req.body);
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
    deletePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.purchaseService.delete(id);
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error en borrar");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    generatePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { products, description, paymentMethod, customerId } = req.body;
                const employee = req.auth;
                const productsPromise = [];
                for (const product of products) {
                    productsPromise.push(this.productService.verifyProduct(product.id, product.quantity));
                }
                const productsResponse = yield Promise.all(productsPromise);
                for (const productArr of productsResponse) {
                    if (!productArr.length)
                        throw new Error("Error al encontrar un producto");
                }
                // crear purchase amount general
                const amount = productsResponse.reduce((acc, curr) => {
                    return acc + Number(curr[0].total);
                }, 0);
                const customer = yield this.customerService.findByID(customerId);
                if (!customer)
                    throw new Error("El cliente no existe");
                const purchaseResponse = yield this.purchaseService.create({
                    amount,
                    description,
                    paymentMethod,
                    customer,
                    employee
                });
                // crear puchases detail
                const purchaseDetail = [];
                for (const product of productsResponse) {
                    purchaseDetail.push(this.purchaseDetailService.create({
                        product: product[0]["id"],
                        purchase: purchaseResponse.id,
                        quantityProduct: product[0]["quantity"],
                        totalPrice: product[0]["total"],
                    }));
                }
                yield Promise.all(purchaseDetail);
                // actualizar los producto
                const updateStock = [];
                for (const product of productsResponse) {
                    updateStock.push(this.productService.updateStock(product[0]["id"], product[0]["quantity"]));
                }
                yield Promise.all(updateStock);
                return this.httpResponse.Ok(res, "Venta realizada con exito, monto total S/" + amount);
            }
            catch (e) {
                return this.httpResponse.Error(res, e.message);
            }
        });
    }
}
exports.PurchaseController = PurchaseController;
