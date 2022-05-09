const express = require('express');
const Contenedor = require ('./index.js');
const producto = require('./test.js');
const app = express();
const port = 8081;

app.get("/productos", (req,res,)=>{
    res.send("asdasdas")
})

app.get("/productoRandom", (req,res,)=>{
    res.send("asdasdasdasdasdasdasasdasdasdadsasdasdasdads")
})

app.listen(port , ()=>{
    console.log("LEVANTANDO SERVIDOR")
})


