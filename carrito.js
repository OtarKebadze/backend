const { Console } = require("console");
let fs = require("fs");
const arrProd = JSON.parse(fs.readFileSync("productos.txt","utf-8"));


class Carrito {
  constructor(cartName) {
    this.carrito = cartName;
  }
  async createCart(){
    let cartId = 1;
    let date = new Date();
    let productos = [];
    let cart = { id: cartId, date: date, productos }
    await fs.promises.writeFile(`${this.carrito}`, JSON.stringify([cart]));
    console.log("CARRITO INEXISTENTE, creando...");
    console.log("EL ID DEL CARRITO ES "+cartId);
  }
// LOS PRODUCTOS SE AGREGAN CON EL ID
  async saveProds(prod) {
    try {
    let data = await JSON.parse(fs.readFileSync("carrito.txt","utf-8"));
    let producto = arrProd.find(elem=>elem.id == prod)
    if (!producto) {
      console.log("PRODUCTO INEXISTENTE")
    } else {
      data[0].productos.push(producto);
      await fs.promises.writeFile(`${this.carrito}`, JSON.stringify(data));
    }
    } catch (error) {
      console.error(error);
    }
  }
  async getCartById(id){
    try {
      let data = await JSON.parse(fs.readFileSync("carrito.txt","utf-8"));
      let encontrado = data.find((elem) => elem.id === id);
      if (!encontrado) {
        console.error("ID NO EXISTE")
      } else {
      return encontrado
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCart(){
    let data = await JSON.parse(fs.readFileSync("carrito.txt","utf-8"));
    return data
  }
  async deteleCart(id){
  let data = await JSON.parse(fs.readFileSync("carrito.txt","utf-8"));
  const index = data.findIndex(elem=> elem.id == id)
  if (index == -1) {
    console.log("CARRITO INEXISTENTE")
  } else {
  data.splice(index,1)
  await fs.promises.writeFile(`${this.carrito}`, JSON.stringify(data));
  console.log("ELIMINADO DE MANERA EXISTOSA")
  }
  }
  async showProds() {
    try {
      const lectura = await fs.promises.readFile(`${this.carrito}`, "utf-8");
      let carrito = await JSON.parse(lectura);
      let arr = carrito[0].productos;
      return arr;
    } catch (error){
      return "NO EXISTE CARRITO  "+error;
    }
  }
  async deleteProdById(id) {
    try {
      let data = await JSON.parse(fs.readFileSync("carrito.txt","utf-8"));
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
      let data = await JSON.parse(fs.readFileSync("carrito.txt","utf-8"));
      let arr = data[0].productos;
      arr.splice(0, arr.length);
      await fs.promises.writeFile(`${this.carrito}`, JSON.stringify(data));
    } catch (error) {
      return error;
    }
  }
}
let carrito = new Carrito("carrito.txt");

module.exports = carrito;
