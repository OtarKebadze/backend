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
        obj.code = this.generateCode("8");
        obj.date = new Date();
        await fs.promises.writeFile(`${this.archivo}`, JSON.stringify([obj]));
        console.log("ARCHIVO INEXISTENTE, creando...");
        return obj.id;
      } else {
        obj.id = data.length+1;
        obj.code = this.generateCode("8");
        obj.date = new Date(8);
        data = [...data, obj];
        await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(data));
        return obj.id;
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
      let data = await JSON.parse(fs.readFileSync("productos.txt","utf-8"));
      const encontrado= data.find(a=> a.id == id)
      return encontrado
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
  generateCode(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = Contenedor;
