const express = require("express");
const Contenedor = require("./index");
const producto = new Contenedor("productos.txt");
const fs = require("fs");
const router = require("./router");
const { engine } = require("express-handlebars");
const { Server: HttpServer} = require("http");
const { Server : SocketServer} = require("socket.io")
const port = 8080;
const app = express();
const httpServer = new HttpServer(app)
const socketServer = new SocketServer(httpServer) 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./public/hbs_views");

app.use("/api", router);

const saveMessages = (message)=>{
const contenido = fs.readFileSync("messages.txt", "utf-8")
if (contenido === "") {
  fs.writeFileSync("messages.txt", JSON.stringify([message]))
} else {
  const messages = JSON.parse(contenido);
  const newMessage = JSON.stringify([...messages,message])
  fs.writeFileSync("messages.txt", newMessage)
}
}

const readMessages = () => {
  const contenido = fs.readFileSync('messages.txt','utf-8');
  if (contenido === '') {
      return 'MENSAJE VACIO';
  } else {
      return JSON.parse(contenido);
  }
}
// Websockets 


socketServer.on("connection", async socket =>{
  console.log("NUEVO USUARIO CONECTADO")

  socket.emit("productos", await producto.getAll())

  socket.emit("messages", await readMessages());

  socket.on("new_message", async (mensaje)=>{
    saveMessages(mensaje);
    socketServer.sockets.emit("messages", await readMessages());
  })
  socket.on("new_product", async (producto)=>{
    let productos = await producto.getAll() === '' ? '' : await producto.getAll();
    socketServer.sockets.emit("productos", productos)
  })
});

httpServer.listen(port, () => {
  console.log(`LEVANTANDO SERVIDOR en el puerto ${port}`);
});
