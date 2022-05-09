const express = require('express');
const Contenedor = require ('./index');
const producto = require('./test');
const app = express();
const port = 8080;

app.get("/productos", (req,res,)=>{
    res.send("asdasdas")
})

app.get("/productoRandom", (req,res,)=>{
    res.send("asdasdasdasdasdasdasasdasdasdadsasdasdasdads")
})

app.listen(port , ()=>{
    console.log("LEVANTANDO SERVIDOR")
})


