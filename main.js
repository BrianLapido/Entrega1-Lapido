//array con objetos
const impresiones3D = [
    { id: 1, nombre: "Llaveros plakits", color: "gris", precio: 1000, descuento: 30, stock: 45 },
    { id: 2, nombre: "Llaveros stich", color: "gris", precio: 1000, descuento: 30, stock: 45 },
    { id: 3, nombre: "Figuras deadpool", color: "A elección", precio: 15000, descuento: 30, stock: 20 },
    { id: 4, nombre: "Figuras naruto", color: "A elección", precio: 15000, descuento: 30, stock: 20 },
    { id: 5, nombre: "Portavasos tortuga", color: "gris", precio: 2500, descuento: 30, stock: 0 },
    { id: 6, nombre: "Portavasos varios", color: "gris", precio: 2500, descuento: 30, stock: 0 },
    { id: 7, nombre: "Maceteros Robert plant", color: "Negro y gris", precio: 4000, descuento: 30, stock: 10 },
    { id: 8, nombre: "Maceteros Robert plant", color: "Negro y gris", precio: 4000, descuento: 30, stock: 10 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || JSON.parse(localStorage.getItem("carrito")) || [];
localStorage.removeItem("carrito");
actualizarCarritoUI();
// clases
class Producto {
    constructor(id, nombre, color, precio, descuento, stock, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
        this.precio = precio;
        this.descuento = descuento;
        this.stock = stock;
        this.cantidad = cantidad;
    }

    getPrecioFinal() {
        return this.precio - (this.precio * this.descuento / 100);
    }

    mostrarInfo() {
        return `Producto ${this.id}:  ${this.nombre} | Precio: $${this.precio} | Color: ${this.color} | Stock: ${this.stock}`;
    }
}
//agregar al carrito
function agregarAlCarrito(id) {
    const producto = impresiones3D.find(p => p.id === id);
    if (!producto) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Producto no encontrado!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }
    if (producto.stock <= 0) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  `${producto.nombre} no tiene stock disponible`,
        
    });
        return;
    }

    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const nuevoProducto = new Producto(producto.id, producto.nombre, producto.color, producto.precio, producto.descuento, producto.stock);
        nuevoProducto.cantidad = 1;
        carrito.push(nuevoProducto);
    }
    producto.stock--;
    localStorage.setItem(`carrito`, JSON.stringify(carrito));
    actualizarCarritoUI();
}
// eliminar producto
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(p => p.id === id);
    if (index === -1) {
        alert("Producto no está en el carrito.");
        return;
    }
    const producto = carrito[index];
    const original = impresiones3D.find(p => p.id === id);
    original.stock += producto.cantidad;
    carrito.splice(index, 1);
     Toastify({
                text: `${producto.nombre} fue eliminado del carrito.`,
                duration: 3000,
                 newWindow: false,
                close: true,
                gravity: "top", 
                position: "left",
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right,rgb(176, 176, 0),rgb(201, 168, 61))",
                },
              }).showToast();
}
// actualizar carrito
function actualizarCarritoUI() {
    const contador = document.getElementById("carrito-contador");
    const lista = document.getElementById("lista-carrito");

    // Cantidad total de productos en el carrito
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = totalCantidad > 0 ? `Carrito (${totalCantidad})` : "carrito";

    // Limpiar contenido
    lista.innerHTML = "";

    // Mostrar productos en la lista
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${producto.nombre} x${producto.cantidad} - $${producto.getPrecioFinal ? producto.getPrecioFinal() * producto.cantidad : (producto.precio - producto.precio * producto.descuento / 100) * producto.cantidad}
            <button class="btn btn-danger btn-sm eliminar-producto" data-id="${producto.id}">Eliminar</button>
        `;
        lista.appendChild(li);
    });

    // evento del boton eliminar
    const botonesEliminar = document.querySelectorAll(".eliminar-producto");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.getAttribute("data-id"));
            eliminarDelCarrito(id);
            actualizarCarritoUI();
        });
    });
}

// confirmar la compra
async function confirmarCompra() {

    if (carrito.length === 0) {
        await Swal.fire({
        title: "Carrito vacio",
        text: "Agrega productos antes de comprar",
        icon: "warning"
    });
        return;
    }

    let total = 0;
    let resumen = "";
    carrito.forEach(producto => {
        const subtotal = producto.getPrecioFinal() * producto.cantidad;
        resumen += `${producto.nombre} x${producto.cantidad} - $${subtotal.toFixed(2)}\n`;
        total += subtotal;
        return;
    });
      
    const resultado = await Swal.fire({
        title: "¿Confirmar compra?",
        text: `${resumen}\n\nTotal a pagar: $${total.toFixed(2)}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, comprar",
        cancelButtonText: "Cancelar"
    });

    if(resultado.isConfirmed){
            Swal.fire({
            title: "Compra exitosa!",
            text: "Gracias por tu compra.",
            icon: "success"
        }).then( () => {
        carrito = []; 
        localStorage.removeItem("carrito");
        actualizarCarritoUI();
        location.reload();
        });
        return;
    }else{
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo fallo con su compra intente nuevamente!",
            footer: '<a href="#">¿tuvo algun inconveniente?</a>'
            });
            
        };
         // Vaciar carrito al confirmar
         
        
         
    
    };

    

// DOM
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".agregar-carrito");
    const botonConfirmar = document.querySelector("#confirmar-compra");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const id = parseInt(boton.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
        });

        botonConfirmar.addEventListener("click", async () => {
            await confirmarCompra();
          });
    
    
    localStorage.setItem(`carrito`, JSON.stringify(carrito)); 
   const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

  if (carritoGuardado) {
    carrito = carritoGuardado.map(p => {
        const prod = new Producto(p.id, p.nombre, p.color, p.precio, p.descuento, p.stock, p.cantidad);
        return prod;
    });
}

    actualizarCarritoUI();
});