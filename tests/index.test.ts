
import 'jest';
import request from "supertest";
import { ServerBootstrap } from "../src/server";
import { DataSource } from "typeorm"
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
  console.log("me ejecute primero")
})

afterAll(async () => {
  await server.connectionRef.destroy()
  server.server.closeAllConnections()
  server.server.closeIdleConnections()
  server.server.close()
  // console.log("me ejecute ultimo")
});

describe("Test a la aplicacion FarmaciaBackendApp",()=>{
  
  test('CP06. Productos mas solicitados', async () => {
    const response = await request(server.app)
        .get("/api/products/most-selled")
        .set('Authorization',`Bearer ${accessToken}`)
        .send();
    expect(response.statusCode).toBe(200);
    console.log("me ejecute primero 1")
  })

  test('CP07. Registrar Laboratorio', () => {
    console.log("me ejecute primero 2")
  })
  test('CP08. Editar Laboratorio', () => {
    console.log("me ejecute primero 3")
  })
})


