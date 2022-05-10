let fs = require("fs");
class Contenedor {
  constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
  }
  async getRandom(){
    let numero = await this.getAll()
    .then(resp=> {
    let numRandom = Math.ceil(Math.random()*resp.length)
    return numRandom
    })
    return this.getById(numero)
  }
  async save(obj) {
    try {
      let data = await this.getAll();

      if (!data) {
        obj.id = 1;
        await fs.promises.writeFile(`${this.archivo}`, JSON.stringify([obj]));
        console.log("ARCHIVO INEXISTENTE, creando...");
        console.log(obj.id);
      } else {
        obj.id = data[data.length - 1].id + 1;
        data = [...data, obj];
        await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(data));
        console.log(obj.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const lectura = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      let arr = JSON.parse(lectura);
      return arr;
    } catch {
      return null;
    }
  }
  async getById(id) {
    try {
      let coincidencia = await this.getAll().then((resp) =>
        resp.find((a) => a.id === id)
      );
      return coincidencia;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      let coincidencia = await this.getAll().then((resp) =>
        resp.filter((a) => a.id !== id)
      );
      await fs.promises.writeFile(
        `${this.archivo}`,
        JSON.stringify(coincidencia)
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(`${this.archivo}`, "");
    } catch (error) {
      return error;
    }
  }
}



module.exports = Contenedor;
