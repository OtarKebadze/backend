const fs = require("fs");
const express = require('express');
const Contenedor = require('./index');
const producto = require('./test');
const app = express();
const port = 8080;
let html = `
<h1>PROYECTO NODE OTAR<h1>
LINKS RECOMENDADOS --->   /productos    ó   /productoRandom
`

app.get("/", (req,res)=>{
    res.send(html)
})

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



