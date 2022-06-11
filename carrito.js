let fs = require("fs");

// const arrayProd = JSON.parse(fs.readFileSync("productos.txt", "utf-8"));

class Carrito {
  constructor(cartName) {
    this.carrito = cartName;
  }
  async saveProds(prod) {
    try {
      let data = await this.showProds();
      if (!data) {
        let cartId = 1;
        prod.id = 1;
        let date = new Date();
        let productos = [prod];
        let cart = { IdCart: cartId, Date: date, productos };
        await fs.promises.writeFile(`${this.carrito}`, JSON.stringify([cart]));
        console.log("ARCHIVO INEXISTENTE, creando...");
        return "CART ID: " + cartId;
      } else {
        prod.id = data[0].productos.length + 1;
        data[0].productos.push(prod);
        await fs.promises.writeFile(`${this.carrito}`, JSON.stringify(data));
        return data[0].idCart;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async showProds() {
    try {
      const lectura = await fs.promises.readFile(`${this.carrito}`, "utf-8");
      let arr = await JSON.parse(lectura);
      return arr;
    } catch {
      return null;
    }
  }
  async deleteProdById(id) {
    try {
      let data = await this.showProds();
      let arr = data[0].productos;
      let index = arr.findIndex((elem) => elem.id === id);
      if (index === -1) {
        console.error("ID NO EXISTE")
      } else {
        arr.splice(index,1)
        await fs.promises.writeFile(`${this.carrito}`, JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAllProds() {
    try {
      await fs.promises.writeFile(`${this.carrito}`, "");
    } catch (error) {
      return error;
    }
  }
  generateCode(length) {
    const result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (const i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
let carrito = new Carrito("carrito.txt");
carrito.saveProds({"price":500000});

module.exports = Carrito;
