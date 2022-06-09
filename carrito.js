let fs = require("fs");
const arrayProd = JSON.parse(fs.readFileSync("productos.txt", "utf-8"));

class Carrito{ 
    constructor(nombreCarrito){
    this.carrito=nombreCarrito;
    }
    saveProds(prod){

    }
    showProds(){

    }
    deleteProdById(id){

    }
    deleteAllProds(){
        
    }
}

module.exports = Carrito;