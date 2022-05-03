let fs = require ("fs")
class Contenedor {
    constructor (nombreArchivo){
    this.archivo=nombreArchivo
    }
    async save(obj){
        try {
        let lectura = await fs.promises.readFile(`${this.archivo}`, "utf-8")
        //  ESTO ES UN JSON -> console.log(lectura)
        let archivoLeido = JSON.parse(lectura)
        // ESTO ES UN OBJETO ->console.log(archivoLeido)
        obj.id=archivoLeido[archivoLeido.length-1].id+1
        archivoLeido=[
        ...archivoLeido,
        obj
        ]
        fs.promises.writeFile(`${this.archivo}`,JSON.stringify(archivoLeido))
        }catch (error) {
        obj.id= 1;
        console.log("ARCHIVO INEXISTENTE, creando...")
        fs.promises.writeFile(`${this.archivo}`,JSON.stringify([obj]))
        }
        
    }
}

    // getbyId(id){

    // }
    // getAll(){

    // }
    // deleteById(id){

    // }
    // deleteAll(){

    // }
// }

const producto = new Contenedor ("productos.txt")
producto.save({title: "hola", price: 100 , thumbnail: "thumbnail"})



