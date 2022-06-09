const express = require("express");
const router = require("./router");
const app = express();
const port = 8080;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ENDPOINTS PARA PRODUCTOS 

app.use("/api", router);
// ENDPOINTS PARA CARRITO

app.use("/api/carrito", router);

app.listen(port, ()=>{
  console.log(`ESTOY ESCUCHANDO EN EL PUERTO ${port}`)
})

