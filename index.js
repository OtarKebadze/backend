let fs = require ("fs")
class Contenedor {
    constructor (nombreArchivo){
    this.archivo=nombreArchivo
    }
    async save(obj){
        try {
        
        let data = await this.getAll()
        console.log(data)
        if (!data){
        obj.id=1;
        await fs.promises.writeFile(`${this.archivo}`,JSON.stringify([obj]))
        console.log("ARCHIVO INEXISTENTE, creando...")
        }else{
        obj.id=data[data.length-1].id+1
        data=[
        ...data,
        obj
        ]
        await fs.promises.writeFile(`${this.archivo}`,JSON.stringify(data)) 
        }
        
        }catch (error) {
        console.log(error)
        }
        
    }
    async getAll(){
        try {
        const lectura = await fs.promises.readFile(`${this.archivo}`, "utf-8")
        //  ESTO ES UN JSON -> console.log(lectura)
        let arr= await JSON.parse(lectura)
        return arr
        } catch (error) {
        return null
        }
    
    }
    async getById(id){
        try {
        let coincidencia = await this.getAll()
        .then((resp)=>resp.find(a=>a.id === id))
        return coincidencia
        } catch (error) {
        console.log(error)
        }
    }
    async deleteById(id){
        try {
        let coincidencia = await this.getAll()
        .then((resp)=>resp.filter(a=>a.id !== id))
        await fs.promises.writeFile(`${this.archivo}`,JSON.stringify(coincidencia)) 
        } catch (error) {
            console.log(error)
        }
    
    }
    async deleteAll(){
    try {
    await fs.promises.writeFile(`${this.archivo}`,"") 
    } catch (error) {
    return error
    }

    }
}

    
    
    
    
// }

module.exports=Contenedor




