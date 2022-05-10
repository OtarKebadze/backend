const Contenedor = require("./index");

const producto = new Contenedor("productos.txt");

/* PRODUCTOS */
// let i = 0;
// let arr = [
//   {
//     title: "LENOVO",
//     imagen:
//       "https://www.alishop.com.ar/wp-content/uploads/2021/07/legion-Pro-3.jpg",
//     precio: 200,
//   },
//   {
//     title: "ACER",
//     imagen:
//       "https://www.alishop.com.ar/wp-content/uploads/2021/07/legion-Pro-3.jpg",
//     precio: 400,
//   },
//   {
//     title: "ALIENWARE",
//     imagen:
//       "https://www.alishop.com.ar/wp-content/uploads/2021/07/legion-Pro-3.jpg",
//     precio: 600,
//   },
// ];

/* SE HACE PRUEBA DE TIEMPO, PORQUE SINO SE PISAN*/

// function intervaloTiempo() {
//   let intervalId = setInterval(() => {
//     producto.save(arr[i]);
//     i++;
//   }, 1000);
//   setTimeout(() => {
//     clearInterval(intervalId);
//   }, 3500);
// }
// intervaloTiempo();

/* METODOS 
    IR USANDO DE A UN METODO PARA EVITAR PROBLEMAS
*/
// producto.getAll()
// .then(resp=>console.log(resp))

// producto.getById(5)
// .then((resp)=> console.log(resp));

// producto.deleteById(2)
// .then((resp)=> console.log(resp));

/*descomentar solo si se quiere resetear el txt*/

//producto.deleteAll()


// producto.getRandom()
// .then((resp)=> console.log(resp));


module.exports = producto;
