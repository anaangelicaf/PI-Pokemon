const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');
const pokemon = {
    "id": "9b1deb4d-3b7d-2bad-9bdd-3b0d4b3dcb4d",
     "name": "ana",
     "life": 15,
     "attack": 25,
     "defense": 35,
     "speed": 45,
     "weight": 30,
     "height":60,
     "image": "https://media.redadn.es/imagenes/pokemaster_340798.jpg",
     "types": [
         "1",
         "3"
      ]    
}

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({ })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
  describe("Stats", () => {
    it("Arroja un error si vida no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", life: "asd" })
        .then(() => done(new Error("Vida no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si fuerza no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", attack: "asd" })
        .then(() => done(new Error("Fuerza no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si defensa no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", defense: "asd" })
        .then(() => done(new Error("Defensa no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si velocidad no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", speed: "asd" })
        .then(() => done(new Error("Velocidad no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si altura no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", height: "asd" })
        .then(() => done(new Error("Altura no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si peso no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", weight: "asd" })
        .then(() => done(new Error("Peso no es un numero")))
        .catch(() => done());
    });

    it("Funciona si se pasa el name y no se pasa un valor o solo algun valor", () => {
      Pokemon.create({ name: "Pikachu" });
      Pokemon.create({ name: "Pikachu", life: 100});
      Pokemon.create({ name: "Pikachu", attack: 100});
      Pokemon.create({ name: "Pikachu", defense: 100 });
      Pokemon.create({ name: "Pikachu", speed: 100 });
      Pokemon.create({ name: "Pikachu", height: 100 });
      Pokemon.create({ name: "Pikachu", weight: 100 });
    });

  });

});
