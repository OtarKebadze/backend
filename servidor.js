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

let messages = Array.from(fs.readFileSync("messages.txt", "utf-8"));


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

socketServer.on("connection", (socket)=>{
  console.log("NUEVO USUARIO CONECTADO")
  socket.emit("messages", messages);
  socket.on("new_message", (mensaje)=>{
    messages.push(mensaje);
    socketServer.sockets.emit("messages", messages);
  })
});

httpServer.listen(port, () => {
  console.log(`LEVANTANDO SERVIDOR en el puerto ${port}`);
});
