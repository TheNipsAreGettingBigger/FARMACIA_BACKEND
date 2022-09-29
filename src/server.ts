import { EmployeeRouter } from './employee/employee.router';

import "reflect-metadata";
import express,{ Application } from "express"
import http,{ createServer } from "http"
import morgan from "morgan"
import cors from "cors"
import { ConfigServer } from "./config/config"
import { DataSource } from "typeorm"
import { AuthRouter } from './auth/auth.router';
import { ProductRouter } from './product/product.router';
import { LaboratoryRouter } from './laboratory/laboratory.router';
import { PurchaseRouter } from './purchase/purchase.router';

class ServerBootstrap extends ConfigServer{
  #app :Application
  #server : http.Server
  #port : number
  constructor(){
    super()
    this.#port = this.getNumberEnv("PORT")
    this.#app = express()
    this.#server = createServer(this.#app)
    this.dbConnect()
    this.#config()
    this.listen()
  }

  // https://gist.github.com/ThomRoman/1e77b8b5b70747a91bf1a6c9058587d9
  #middlewares = () => {
    const corsOptions = {
      origin : function(origin:any,callback:any){
        const whiteList = ['http://localhost:3000','http://localhost:5173']
        if(whiteList.indexOf(origin) !== -1) return callback(null,true)
        return callback(new Error('Not allowed by CORS'))
      }
    }
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({extended : true}))
    this.#app.use(morgan("dev"))
    this.#app.use(cors({
      origin: true,
      // ...corsOptions,
      // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
    }))
  }
  #routers = ():express.Router[] => {
    return [
      new EmployeeRouter().router,
      new AuthRouter().router,
      new ProductRouter().router,
      new LaboratoryRouter().router,
      new PurchaseRouter().router
    ]
  }
  #config = () => {
    this.#middlewares()
    this.#app.use("/api",this.#routers())
  }

  async dbConnect():Promise<DataSource | void>{
    return this.initConnect.then(() => {
      console.log("Connect Success");
    })
    .catch((err) => {
      console.error(err);
    });
  }

  listen = () => {
    this.#server.listen(this.#port,()=>{
      console.log(`Server listening on port => ${this.#port} ::ENV = ${this.getEnvironment("ENV") ?? "development"}`)
    })
  }
}

new ServerBootstrap()