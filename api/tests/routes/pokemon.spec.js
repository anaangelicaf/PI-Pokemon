/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

const agent = session(app);


describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe("GET /pokemons", () => {
    it("Si no se recibe mas que la ruta devuelve 200 con los pokemons", (done) => {
      agent.get("/pokemons").then(() => done());
    });
  });

  describe("Rutas types", () => {
    describe("GET /types", () => {
      it("se espera una respuesta 200", () => agent.get("/types").expect(200));
    });
  });
  describe("Obtiene un pokemon por id o name", () => {
    describe("GET /pokemons/:id", () => {
      it("Se espera una respuesta 200 se si pasa un id", () =>
        agent.get("/pokemons/10").expect(200));
    });
    describe("GET /pokemons?name=xxx", () => {
      it("Si se recibe name devolver 200", () =>
        agent.get("/pokemons?name=pikachu"));
    });
    
  });
  //describe("GET /pokemons", () => {
    //it("Si no se recibe mas que la ruta devuelve 200 con los pokemons", (done) => {
      //agent.get("/pokemons").then(() => done());
    //});
  //});
});