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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ServerBootstrap_port, _ServerBootstrap_middlewares, _ServerBootstrap_routers;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBootstrap = void 0;
const employee_router_1 = require("./employee/employee.router");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const auth_router_1 = require("./auth/auth.router");
const product_router_1 = require("./product/product.router");
const laboratory_router_1 = require("./laboratory/laboratory.router");
const purchase_router_1 = require("./purchase/purchase.router");
const resume_router_1 = require("./resume/resume.router");
class ServerBootstrap extends config_1.ConfigServer {
    constructor() {
        super();
        _ServerBootstrap_port.set(this, void 0);
        // https://gist.github.com/ThomRoman/1e77b8b5b70747a91bf1a6c9058587d9
        _ServerBootstrap_middlewares.set(this, () => {
            const corsOptions = {
                origin: function (origin, callback) {
                    const whiteList = ['http://localhost:3000', 'http://localhost:5173'];
                    if (whiteList.indexOf(origin) !== -1)
                        return callback(null, true);
                    return callback(new Error('Not allowed by CORS'));
                }
            };
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            if (this.nodeEnv !== "test") {
                this.app.use((0, morgan_1.default)("dev"));
            }
            this.app.use((0, cors_1.default)({
                origin: true,
                // ...corsOptions,
                // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
                credentials: true,
            }));
        });
        _ServerBootstrap_routers.set(this, () => {
            return [
                new employee_router_1.EmployeeRouter().router,
                new auth_router_1.AuthRouter().router,
                new product_router_1.ProductRouter().router,
                new laboratory_router_1.LaboratoryRouter().router,
                new purchase_router_1.PurchaseRouter().router,
                new resume_router_1.ResumeRouter().router,
            ];
        });
        this.config = () => {
            __classPrivateFieldGet(this, _ServerBootstrap_middlewares, "f").call(this);
            this.app.use("/api", __classPrivateFieldGet(this, _ServerBootstrap_routers, "f").call(this));
        };
        this.listen = () => {
            this.server.listen(__classPrivateFieldGet(this, _ServerBootstrap_port, "f"), () => {
                var _a;
                console.log(`Server listening on port => ${__classPrivateFieldGet(this, _ServerBootstrap_port, "f")} ::ENV = ${(_a = this.getEnvironment("ENV")) !== null && _a !== void 0 ? _a : "development"}`);
            });
        };
        __classPrivateFieldSet(this, _ServerBootstrap_port, this.getNumberEnv("PORT"), "f");
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        // this.config()
        // this.dbConnect()
        // this.listen()
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.initConnect.then((connectionRef) => {
                return Promise.resolve(connectionRef);
            })
                .catch((err) => {
                console.error(err);
            });
        });
    }
    upServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnect();
            console.log("DB Connect Success");
            this.listen();
        });
    }
}
exports.ServerBootstrap = ServerBootstrap;
_ServerBootstrap_port = new WeakMap(), _ServerBootstrap_middlewares = new WeakMap(), _ServerBootstrap_routers = new WeakMap();
