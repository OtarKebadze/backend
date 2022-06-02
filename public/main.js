const socket = io();
 
// CHAT
const enviarMensaje = () => {
    const mail= document.getElementById("mail").value;
    const text= document.getElementById("text").value;
    const time= new Date();
    const mensaje = { mail, text ,time };
    socket.emit("new_message", mensaje);
    return false
};

const mensajeArmado = (mensaje) => {
const {mail, text,time} = mensaje;
return`
<div style="width:100% ; display:flex">
<strong style="color:blue">${mail}</strong>
<div>
<p style="color:brown">${time}</p>
<p style=" font-style: italic; color:green">${text}</p>
</div>
</div>
`
};

const agregarMensaje = (mensajes)=>{
const mensajeFinal = mensajes
.map(mensaje => mensajeArmado(mensaje))
.join(" ");
document.getElementById("mensajes").innerHTML = mensajeFinal;
}

socket.on("messages", (messages) => agregarMensaje(messages))

// NUEVO PRODUCTO

const enviarProducto = () => {
    const title= document.getElementById("title").value;
    const price= document.getElementById("price").value;
    const image= document.getElementById("thumbnail").value;
    const producto = { title, price ,image };
    socket.emit("new_product", producto);
    return false
};

const productoArmado = (producto) => {
const {title, price ,image } = producto;
return`
<tr>
<td>${title}</td>
<td>$ ${price}</td>
<td><img style="width: 50px; height:50px" src=${image}</td>
</tr>
`
};

const agregarProducto = (productos)=>{
const productoFinal = productos
.map(producto => productoArmado(producto))
.join(" ");
document.getElementById("prods").innerHTML = productoFinal;
}

socket.on("messages", (productos) => agregarProducto(productos))
