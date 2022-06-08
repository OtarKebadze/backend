const fs = require("fs");
const express = require("express");
const router = express.Router();
const Contenedor = require("./index");
const producto = new Contenedor("productos.txt");
const arrayProd = JSON.parse(fs.readFileSync("productos.txt", "utf-8"));

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/productos/:id", (req, res) => {
  let num = parseInt(req.params.id);
  if (isNaN(num) || num < 0)
    return res.status(400).send({ error: "ID INVALIDO" });
  producto.getById(num).then((resp) => {
    if (resp === undefined)
      return res.send({ error: "producto no encontrado" });
    else res.send(`${JSON.stringify(resp)}`);
  });
});

router.post("/productos", (req, res) => {
  producto.save(req.body).then(() =>
    producto.getAll().then(() => {
      res.send(`PRODUCTO AGREGADO DE MANERA EXITOSA
   <a href="http://localhost:8080/api/">VOLVER AL FORMULARIO DE CARGA
    `);
    })
  );
});

router.put("/productos/:id", (req, res) => {
  let num = parseInt(req.params.id);
  if (isNaN(num) || num < 0)
    return res.status(400).send({ error: "ID INVALIDO" });
  let elementoEncontrado= arrayProd.find((elem) => elem.id===num
  );
  arrayProd.map(() => {
    if (!elementoEncontrado) {
      return res.status(400).send({ error: "ID INVALIDO" });
    } else {
      elementoEncontrado.title = req.body.title;
      elementoEncontrado.price = req.body.price;
      elementoEncontrado.thumbnail = req.body.thumbnail;
    }
  });
  res.send(arrayProd);
  fs.writeFileSync("productos.txt", JSON.stringify(arrayProd), "utf-8");
});

router.delete("/productos/:id", (req, res) => {
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

module.exports = router;
