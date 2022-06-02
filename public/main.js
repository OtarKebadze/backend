const socket = io();

const enviarMensaje = ()=> {
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

socket.on("messages", (arrMessages) => agregarMensaje(arrMessages))


