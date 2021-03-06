const fs = require("fs");
const express = require("express");
const router = express.Router();
const Contenedor = require("./index");
const producto = new Contenedor("productos.txt");
const carrito = require("./carrito")
const {autenticationUser , authorizeUser} = require("./middleware/admin");

//NO OLVIDAR CAMBIAR ISADMIN A TRUE O FALSE DEPENDIENDO DE LAS FUNCIONALIDADES QUE REQUIERAN.


//ROUTER PRODUCTOS
router.get("/", autenticationUser,(req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/productos/:id",autenticationUser,authorizeUser,(req, res) => {
  let num = parseInt(req.params.id);
  if (isNaN(num) || num < 0)
    return res.status(400).send({ error: "ID INVALIDO" });
  producto.getById(num).then((resp) => {
    if (resp === undefined)
      return res.send({ error: "producto no encontrado" });
    else res.send(`${JSON.stringify(resp)}`);
  });
});

router.post("/productos", autenticationUser,authorizeUser,(req, res) => {
  producto.save(req.body).then(() =>
    producto.getAll().then(() => {
      res.send(`PRODUCTO AGREGADO DE MANERA EXITOSA
   <a href="http://localhost:8080/api/">VOLVER AL FORMULARIO DE CARGA
    `);
    })
  );
});

router.put("/productos/:id", autenticationUser,authorizeUser,(req, res) => {
  let num = parseInt(req.params.id);
  const {title, price,thumbnail ,stock} = req.body;
  if (isNaN(num) || num < 0)
    return res.status(400).send({ error: "ID INVALIDO" });
  let elementoEncontrado = arrayProd.find(elem => elem.id===num
  );
  arrayProd.map(() => {
    if (!elementoEncontrado) {
      return res.status(400).send({ error: "ID INVALIDO" });
    }
    if(!title || !price || !thumbnail || !stock || isNaN(price) || isNaN(stock)){
      return res.status(404).send({ error: "PORFAVOR INGRESAR DATOS VALIDOS" });
    } else {
      elementoEncontrado.title = req.body.title;
      elementoEncontrado.price = req.body.price;
      elementoEncontrado.thumbnail = req.body.thumbnail;
      elementoEncontrado.stock = req.body.stock
    }
  });
  res.send(arrayProd);
  fs.writeFileSync("productos.txt", JSON.stringify(arrayProd), "utf-8");
});

router.delete("/productos/:id", autenticationUser,authorizeUser,(req, res) => {
  let num = parseInt(req.params.id);
  if (isNaN(num) || num < 0)
    return res.status(400).send({ error: "ID INVALIDO" });
  producto.getById(num).then((resp) => {
    if (resp === undefined)
      return res.send({ error: "producto no encontrado" });
    else {
      producto.deleteById(num);
    }
  });
  //LE PUSE UN SET TIME OUT, PORQUE SINO ME DEVOLVIA UN JSON SIN ACTUALIZAR,
  //PERO ME BORRABA EL PRODUCTO DEL TXT
  setTimeout(() => {
    return producto.getAll().then((resp) =>
      res.send(`
        ${JSON.stringify(resp)}
        `)
    );
  }, 500);
});


//ROUTER CARRITO

router.get("/:id/productos",async (req, res) =>{
  let id = req.params.id;
  const arrCart = JSON.parse(fs.readFileSync("carrito.txt" , "utf-8"))
  let carritoEncontrado = await arrCart.find(elem => elem.id === Number(id))
  if (!carritoEncontrado) {
    return res.status(404).send("CARRITO INEXISTENTE")
  } else {
    carrito.showProds().then(resp=> res.send(resp));
  }
})

router.post("/",(req, res) =>{
  carrito.createCart();
  res.send("Carrito Creado")
})
 // SE AGREGA CON EL ID EL PRODUCTO, LE AGREGUE ESE PARAMETRO PORQUE SINO NO SE PODIA AGREGAR PRODUCTO.
router.post("/:id/productos/:id_prod",async (req, res) =>{
  const idCart= Number(req.params.id);
  const idProd = Number(req.params.id_prod);
  let carritoEncontrado = await carrito.getCartById(idCart);
 if (!carritoEncontrado) {
    return res.status(404).send("CARRITO INEXISTENTE")
 } else {
  let productoEncontrado = await producto.getById(idProd)
  carrito.saveProds(productoEncontrado.id);
 }
 carrito.showProds().then(resp=> res.send(resp));
})

router.delete("/:id",(req, res) =>{
  let id = req.params.id;
  carrito.deteleCart(id)
  setTimeout(() => {
    carrito.getAllCart().then(resp=> res.send(resp))
  }, 500); 
})

router.delete("/:id/productos/:id_prod", async(req, res) =>{
  const idCart= Number(req.params.id);
  const idProd = Number(req.params.id_prod);
  let carritoEncontrado = await carrito.getCartById(idCart);
  if (!carritoEncontrado) {
    return res.status(404).send("CARRITO INEXISTENTE")
 } else {
   let productoEncontrado = await producto.getById(idProd)
  carrito.deleteProdById(productoEncontrado.id);
  carrito.showProds().then(resp=> res.send(resp));
 }
})

module.exports = router;
