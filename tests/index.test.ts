import 'jest';
import request from "supertest";
import { ServerBootstrap } from "../src/server";

const server = new ServerBootstrap()
let accessToken:string | null = null

beforeAll(async () => {
  server.config()
  await server.dbConnect()

  const response = await request(server.app)
    .post('/api/login')
    .send({
      username:'thomtwd',
      password : '123456'
    })
    .expect(200)
  accessToken = response.body.accessToken
})

describe("Test a la aplicacion FarmaciaBackendApp",()=>{
  test('CP06. Productos mas solicitados', async () => {
    const response = await request(server.app)
        .get("/api/products/most-selled")
        .set('Authorization',`Bearer ${accessToken}`)
        .send();
    expect(response.statusCode).toBe(200);
  })

  test('CP07. Registrar Laboratorio', () => {

  })
  test('CP08. Editar Laboratorio', () => {

  })
})