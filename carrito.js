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
    generateCode(length) {
        const result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( const i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = Carrito;