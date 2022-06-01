const fs = require("fs");
const express = require("express");
const producto = require("./test");
const router = express.Router();


router.get("/", (req, res) => {
  res.render('producto')
});

router.get("/productos", async (req, res) => {
let productos = await producto.getAll() === '' ? '' : await producto.getAll();
res.render('producto', {productos})
});

// router.get("/productos/:id", (req, res) => {
//   let num = parseInt(req.params.id);
//   if (isNaN(num) || num < 0) return res.status(400).send({ error: "ID INVALIDO" });
//   producto.getById(num).then((resp) =>{
//   if (resp === undefined ) return res.send({ error : 'producto no encontrado' });
//   else res.send(`${JSON.stringify(resp)}`)
// });
// });

router.post("/", (req, res) => {
  producto.save(req.body).then( () =>  res.render("producto"));
});

// router.put("/productos/:id", (req, res) => {
//   let num = parseInt(req.params.id);
//   if (isNaN(num) || num < 0)
//     return res.status(400).send({ error: "ID INVALIDO" });
//   let coincidencia = arrayProd.find((elem) => {
//     if (elem.id !== num) return false;
//     if (elem.id === num) return true;
//   });
//   arrayProd.map((prod) => {
//     if (!coincidencia) {
//       return res.status(400).send({ error: "ID INVALIDO" });
//     } else {
//       prod.title = req.body.title;
//       prod.price = req.body.price;
//       prod.thumbnail = req.body.thumbnail;
//       return prod;
//     }
//   });
//   res.send(arrayProd);
//   fs.writeFileSync("productos.txt", JSON.stringify(arrayProd), "utf-8");
// });

// router.delete("/productos/:id", (req, res) => {
//     let num = parseInt(req.params.id);
//     if (isNaN(num) || num < 0) return res.status(400).send({ error: "ID INVALIDO" });
//     producto.getById(num).then((resp) =>{
//     if (resp === undefined ) return res.send({ error : 'producto no encontrado' });
//     else{
//     producto.deleteById(num)
//     }})
    //LE PUSE UN SET TIME OUT, PORQUE SINO ME DEVOLVIA UN JSON SIN ACTUALIZAR, 
    //PERO ME BORRABA EL PRODUCTO DEL TXT
//     setTimeout(() => {
//         return producto.getAll()
//         .then((resp) =>
//         res.send(`
//         ${JSON.stringify(resp)}
//         `));
//     }, 500);
// });


module.exports = router;
