const socket = io();

const enviarMensaje = ()=> {
    const mail= document.getElementById("mail").value;
    const text= document.getElementById("text").value;
    const time= new Date();
    const mensaje = { mail, text, time }
    socket.emit("new_message", mensaje)
    return false
};

const mensajeArmado = (mensaje) => {
const {mail, text,time} = mensaje;
return`
<div>
<strong style="color:blue">${mail}</strong>
<p style="color:brown">${time}</p>
<p style=" font-style: italic; color:green">${text}</p>
</div>
`
};

const agregarMensaje = (mensajes)=>{
const mensajesFinal = mensajes
.map(mensaje => mensajeArmado(mensaje))
.join(" ");
document.getElementById("mensajes").innerHTML = mensajesFinal;
}

socket.on("messages", (messages)=> agregarMensaje(messages))


