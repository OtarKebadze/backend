const express = require("express");
const router = require("./router");
const app = express();
const port = 8080;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", router);

app.listen(port, ()=>{
  console.log(`ESTOY ESCUCHANDO EN EL PUERTO ${port}`)
})

