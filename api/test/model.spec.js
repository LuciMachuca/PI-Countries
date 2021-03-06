const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      // Debería funcionar cuando es un nombre válido
      it("should work when its a valid name", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });

      // Debería funcionar cuando el tipo de datos del nombre es un array
      it("should work when name's data type is an array", () => {
        Country.create({
         id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(typeof(country.dataValues.name)).toBe("string")
        });
      });
    });

    // ****************** Pruebas para cada entidad *********************

    // Debería arrojar un error si la entidad es nula 
    // Debería funcionar cuando es válida
    // Debería funcionar cuando el tipo de datos de la entidad es un array
    
    // ID
    describe("id", () => {
 
      it("should throw an error if id is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid id")))
          .catch(() => done());
      });

      it("should work when its a valid id", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });

      it("should work when id's data type is an array", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(typeof(country.dataValues.id)).toBe("string")
        });
      });
    });

    // imgbandera
    describe("imgbandera", () => {
 
      it("should throw an error if imgbandera is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid imgbandera url")))
          .catch(() => done());
      });

      it("should work when its a valid imgbandera url", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });

      it("should work when imgbandera data type is an array", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(typeof(country.dataValues.flags)).toBe("string")
        });
      });
    });

    // Continents
    describe("continents", () => {
      it("should throw an error if continents is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid continents")))
          .catch(() => done());
      });
      it("should work when its a valid continents", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });
      it("should work when continents's data type is an array", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(Array.isArray(country.dataValues.continents)).toBe(true)
        });
      });
    });

    // Capital
    describe("capital", () => {
      it("should throw an error if capital is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid capital")))
          .catch(() => done());
      });
      it("should work when its a valid capital", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });
      it("should work when capital's data type is an array", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(Array.isArray(country.dataValues.capital)).toBe(true)
        });
      });
    });

    // Subregion
    describe("subregion", () => {
      it("should throw an error if subregion is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid subregion")))
          .catch(() => done());
      });
      it("should work when its a valid subregion", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });
      it("should work when subregion's data type is string", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(typeof(country.dataValues.subregion)).toBe("string")
        });
      });
    });

    // Area
    describe("area", () => {
      it("should throw an error if area is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid area")))
          .catch(() => done());
      });
      it("should work when its a valid area", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });
      it("should work when area's data type is number", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(typeof(country.dataValues.area)).toBe("number")
        });
      });
    });

    // Population
    describe("population", () => {
      it("should throw an error if population is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It require a valid population")))
          .catch(() => done());
      });
      it("should work when its a valid population", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        });
      });
      it("should work when population's Data Type is number", () => {
        Country.create({
          id: "VEN",
          name: "Venezuela",
          continents: "1234",
          capital: "Caracas",
          imgbandera: "https://flagcdn.com/w320/ve.png",
          subregion: "South America",
          area: 916445,
          population: 28435943,
        }).then((country) => {
          expect(typeof(country.dataValues.population)).toBe("number")
        });
      });
    });
  });
});