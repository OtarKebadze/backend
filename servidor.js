const express = require("express");
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

const arrProductos = JSON.parse(fs.readFileSync("productos.txt", "utf-8"))
const arrMessages = JSON.parse(fs.readFileSync("messages.txt", "utf-8"))

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
if (contenido === []) {
  fs.writeFileSync("messages.txt", JSON.stringify([message]))
} else {
  let newMessage = JSON.stringify([...arrMessages,message])
  fs.writeFileSync("messages.txt", newMessage)
}
}
// Websockets 

socketServer.on("connection", socket =>{
  console.log("NUEVO USUARIO CONECTADO")

  //socket.emit("productos", arrProductos)

  socket.emit("messages", arrMessages);

  socket.on("new_message", (mensaje)=>{
    saveMessages(mensaje);
    socketServer.sockets.emit("messages", arrMessages);
  })

});

httpServer.listen(port, () => {
  console.log(`LEVANTANDO SERVIDOR en el puerto ${port}`);
});
