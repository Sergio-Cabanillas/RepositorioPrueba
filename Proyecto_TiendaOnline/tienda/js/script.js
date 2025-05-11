
    /* Empezamos con un bloque para define un array con los productos disponibles
    Cada uno tiene un id único, su nombre, su ruta de imagen, su precio, cantidad incial */
    const productosArray = [
  {
    id: "pantalon-01",
    nombre: "Pantalón negro",
    imagen: "img/pantalon1H.jpg",
    precio: 20,
    cantidad: 1
  },
  {
    id: "pantalon-02",
    nombre: "Pantalón beige",
    precio: 20,
    imagen: "img/pantalon2H.jpg",
    cantidad: 1
  },
  {
    id: "pantalon-03",
    nombre: "Pantalón azul",
    precio: 20,
    imagen: "img/pantalon1M.jpg",
    cantidad: 1
  },
  {
    id: "pantalon-04",
    nombre: "Pantalón oliva",
    precio: 20,
    imagen: "img/pantalon3M.jpg",
    cantidad: 1
  }
]

    /* Iniciamos el carrito de carrito.html desde LocalStorage
    esto se hace para obtener los datos del carrito y que se guarden
    en el navegador (incluso si lo cerramos), si entramos por primera vez 
    y no hay datos lo inicializa como un array vacío */
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    /* Función para guardar el estado actual del carrito en localStorage
    covirténdolo a texto JSON.stringify */
    function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    /* Funcion para buscar todos los elementos con la clase .numero
    que es donde esta el total de productos, suma la cantidad de los
    productos en el carrito (Se acumulan) cada vez que se añade uno
    se actualiza el total */
    function actualizarContador() {
    const contador = document.querySelectorAll(".numero");
    let total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.forEach(el => el.textContent = total);
    }

    /* Funcion con condicional que revisa si el prodcuto ya está 
    en el carrito. Si existe, va aumentando su cantidad, si no, 
    se inicializa con cantidad 1, después se guarda y se sigue 
    actualizándose el contador */
    function añadirAlCarrito(producto) {
    const index = carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    actualizarContador();
    }

    /* Funcion para eliminar un producto que filtramos con "filter" por su id
    actualiza el localStorage, el contenido del carrito y el contador */
    function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
    }

    /* Funcion para limpiar el carrito por completo y dejarlo vacío, es decir,
    para que vuelva a estar a 0, como al principio, guarda los cambios y actualiza
    la vista */
    function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
    }

    // Función para mostrar el carrito de los productos del documento carrito.html
    function mostrarCarrito() {
    const contenedor = document.querySelector(".carrito-productos");
    const totalDOM = document.getElementById("total");

    /* Esta parte comprueba que el carrito esté vacío, si lo está,
    se muestra el mensaje de "carrito vacío" */
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        document.querySelector(".carrito-vacío").style.display = "block";
        totalDOM.textContent = "0€";
        return;
    }

    document.querySelector(".carrito-vacío").style.display = "none";

    let total = 0;

    /* Aquí en esta parte, se comprueba si hay productos o se han añadido al carrito,
    si están, se recorren con el for each, para crear elementos HTML
    con su información */
    carrito.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal; /* Calcular subtotal y el total final en base al precio
        y la cantidad que definimos en el array */

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${prod.nombre}</h3>
            </div>
            <div class="carrito-producto-info">
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${prod.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>€${prod.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>€${subtotal}</p>
                </div>
            </div>
            <button class="carrito-producto-eliminar" data-id="${prod.id}">
                <i class="fa-sharp fa-solid fa-trash" style="color: #0033ff;"></i>
            </button>
        `; /* Copiamos y pegamos el bloque de nuestro html que queremos que aparezca 
        para situarnos y darle la funcionalidad al carrito */
        contenedor.appendChild(div);
    });

    totalDOM.textContent = `€${total}`;

    // Añadir el evento de vaciar cada unidad de prodcuto del carrito que hayamos añadido al hacer click
    document.querySelectorAll(".carrito-producto-eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            eliminarDelCarrito(boton.dataset.id);
        });
    });
    }

    /* Inicalizar el comportamiento al cargar la página, espera a que carge el DOM,
    llamamos a la función actualizarContador() para mostrar el número de productos actuales */
    document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();

    // Le damos al botón de "añadir al carrito" el evento de agregar los prodcutos
    const botonesAñadir = document.querySelectorAll(".añadir");
    botonesAñadir.forEach((boton, index) => {
        boton.addEventListener("click", () => {
    // Aquí usamos el índice de los productos para tomar los datos del array
            const productos = {
                id: productosArray[index].id,
                nombre: productosArray[index].nombre,
                precio: productosArray[index].precio,
                imagen: productosArray[index].imagen
            };
            añadirAlCarrito(productos);
        });
    });

    /* Condicional para comprobar que si estamos en la página del carrito
    con algún producto en la cesta, le añadimos el evento de vaciarlo
    al hacer click en el botón de "Vaciar carrito" llamando otra vez a 
    función vaciarCarrito() */
    if (document.querySelector(".carrito-productos")) {
    mostrarCarrito();
    const vaciar = document.querySelector(".carrito-acciones-vaciar");
    if (vaciar) {
        vaciar.addEventListener("click", () => {
            vaciarCarrito();
        });
    }

    /* Por último, añadimos un condicional para que compruebe que al hacer click en el
    botón de comprar, tenemos productos en la cesta, si es así, se mostrará el mensaje 
    "¡Gracias por la compra!", si no, se mostrará el mensaje "Tu carrito está vacío" */
    const comprarBoton = document.querySelector(".carrito-acciones-comprar");
    if (comprarBoton) {
        comprarBoton.addEventListener("click", () => {
            if (carrito.length > 0) {
                alert("¡Gracias por la compra!");
                vaciarCarrito();
            } else {
                alert("Tu carrito está vacío.");
                }
            });
        }
    } 
});
    
