const fs = require("fs");
const express = require('express');
const Contenedor = require('./index');
const producto = require('./test');
const app = express();
const port = 8080;


app.get("/productos", (req,res)=>{
producto.getAll()
.then(resp=>res.send(
`
${JSON.stringify(resp)}

`
))
.catch(err=>console.log(err))
})


app.get("/productoRandom", (req,res,)=>{
producto.getRandom()
.then(resp=>res.send(
`
${JSON.stringify(resp)}

`
))
})

app.listen(port , ()=>{
    console.log("LEVANTANDO SERVIDOR")
})



