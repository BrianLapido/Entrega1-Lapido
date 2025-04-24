
let cantidadDeObjetos = 0;
const compraMinima = 1;
 
//--------------------------------------Arrays y objetos--------------------------------------------//
let impresiones3D = [
{   nombre:"Llaveros",
    color:"gris",
    stock:true,
    descuento:"30% de descuento comprando mas de 10 unidades",
    precio: 1000
},

{   nombre:"Figuras a escala",
    color: "A eleccion",
    stock: true, 
    medidas: "samll-medium-large",
    precio: 15000
},

{   nombre: "Portavasos",
    color: "gris",
    stock: false,
    disenio:"Anime",
    mensaje: "Los portavasos son fabricados por pedidos",
    precio: 2500
},

{   nombre: "Maceteros Robert",
    color: "Negro y gris",
    medidas: "70mm x 100mm",
    cantidad: 10,
    precio: 4000
}
];
//--------------------------------------Cierre arrays y objetos------------------------------------//



let carrito = [];
//----------------------------------------------Menu----------------------------------------------//
function main(){
    let opcion;
    
    do{
    opcion = prompt (
    "Elija una opcion: \n" +
    "1. Elegir producto \n" +
    "2. Eliminar productos del carrito \n" +
    "3. Confirmar compra \n" +
    "4. Salir de la pagina \n" +
    "Seleccione una opcion"
    )
    switch(opcion){
    case "1":
        elegirProducto();
        break;
    
    case "2":
        EliminarProductos();
        break;

    case "3":
        confirmarCompra();
        break;

    case "4":
        alert("Gracias por visitar nuestra pagina ¡vuelva pronto!");
        break;
    
    default:
    alert("El numero ingresado es incorrecto, intente nuevamente")
    }
    }
    while(opcion !== "4");
    }
    main();
//--------------------------------------------Cierre menu----------------------------------------//



//---------------------------------------------Elegir producto-----------------------------------//
function elegirProducto(){
let listaDeProductos = "Productos en venta: \n";
for(let i = 0; i < impresiones3D.length; i++){
  listaDeProductos += (i + 1) + ". \n" + impresiones3D[i].nombre + ": $" + impresiones3D[i].precio + "\n";
}

let eleccion = prompt(listaDeProductos + "\nIngrese el numero del producto que desea eliminar:")

let indiceProducto = parseInt(eleccion) - 1;


if(indiceProducto >= 0 && indiceProducto < impresiones3D.length){
carrito.push(impresiones3D[indiceProducto]);
cantidadDeObjetos++;

alert("Producto agregado: " + impresiones3D[indiceProducto].nombre);

}else{
    alert("Numero invalido. Intente nuevamente.");
}
}

elegirProducto();
//------------------------------------------Cierre elegir producto------------------------------//



//-------------------------------------------Eliminar carrito------------------------------------//
 function eliminarCarrito(){
if ( carrito.length === 0){
    alert("El carrito esta vacio.");
    return;
}

let listaDeCarrito = "Productos en carrito:\n";
for(let i = 0; i < carrito.length; i++){
    listaDeCarrito += (i + 1) + ". " + carrito[i].nombre + " -$" + carrito[i].precio + "\n";
}
let eleccion = prompt(listaDeCarrito + "\nIngrese el numero del producto que desa eliminar: ");
 let indiceEliminar = parseInt(eleccion) - 1;

 if(indiceEliminar >= 0 && indiceEliminar < carrito.length){
    let eliminado = carrito.splice(indiceEliminar, 1)[0];
    cantidadDeObjetos--;
    alert("Producto eliminado: " + eliminado.nombre);
 }else{
    alert("Invalido, intente nuevamente.");
 };
}
eliminarCarrito();
//---------------------------------------------Cierre eliminar carrito----------------------------//



//-----------------------------------------------Confirmar compra-----------------------------------//
function confirmarCompra(){

if(carrito.length < compraMinima){
alert("Agregue un producto para realizar la compra.");
return;
}

let resumenCompra = "Resumen de su compra:\n";
let total = 0;

for(let producto of carrito){
resumenCompra += "- " + producto.nombre + " $" + producto.precio + "\n";
}

resumenCompra += "\nTotal a pagar: $" + total;

alert(resumenCompra);
alert("¡Gracias por su compra vuelva pronto!");
}
confirmarCompra();
//------------------------------------------------Cierre confirmar compra---------------------------//