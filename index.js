
/* Nombres base de los elementos */
const botonMenu = document.getElementById("botonMenu");              // boton hamburguesa
const menu = document.getElementById("menu");                        // <nav> del header
const enlacesMenu = document.querySelectorAll(".nav__enlace");       // links del menu
const anio = document.getElementById("anio");                        // año del footer



/* ============ MENU HAMBURGUESA(Desplegable) ============ */

// Guarda si el menu esta abierto o cerrado (arranca cerrado)
let menuAbierto = false;

/* Funcion para que cambie el estado de el Menu Hamburguesa */
function alternarMenu(abrir) {
    let estaAbierto;
    if (typeof abrir === "boolean") {
        estaAbierto = abrir;
    }
    else {
        if (menuAbierto === true) {
            estaAbierto = false;
        } else {
            estaAbierto = true;
        }
    }
    menuAbierto = estaAbierto;

    // En el CSS muestra el menu cuando data-abierto vale "true"
    menu.setAttribute("data-abierto", estaAbierto);
    botonMenu.setAttribute("aria-expanded", estaAbierto);
}

// Al tocar la hamburguesa se abre o se cierra el menu
botonMenu.addEventListener("click", () => alternarMenu());

// Al tocar un link del menu se cierra, para no tapar la pagina
enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", () => alternarMenu(false));
});



/* ============ LINK ACTIVO DEL HEADER ============ */

// Marca como actual el link que se le pasa y desmarca los otros
function marcarActivo(activo) {
    enlacesMenu.forEach((enlace) => {
        if (enlace === activo) {
            enlace.setAttribute("aria-current", "page");
        } else {
            enlace.setAttribute("aria-current", "false");
        }
    });
}

// Al tocar un link del menu queda marcado (Tengo que ver como hacer que sea automatico al recorrido en scroll)
enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", () => marcarActivo(enlace));
});



/* ============ LINEA DE ACTUALIZACION DE AÑO ============ */
anio.textContent = new Date().getFullYear();



/* ============ CARRUSEL ============ */
const pistaCarrusel = document.getElementById("pistaCarrusel");        // fila de tarjetas
const botonAnterior = document.getElementById("carruselAnterior");     // boton "<"
const botonSiguiente = document.getElementById("carruselSiguiente");   // boton ">"
const tarjetas = pistaCarrusel.querySelectorAll(".card-auto");         // tarjetas

// Posicion de la primera tarjeta que se ve (0 = la primera de todas)
let indice = 0;

// Cuantas tarjetas entran segun el ancho de pantalla (900px)
function cuantasVisibles() {
    if (window.innerWidth >= 900) {
        return 3;
    } else if (window.innerWidth >= 640) {
        return 2;
    } else {
        return 1;
    }
}

// Muestra solo las tarjetas que corresponden y esconde el resto
function mostrarCarrusel() {
    const visibles = cuantasVisibles();
    const ultimo = tarjetas.length - visibles;     // el indice mas alto al que se puede llegar

    // Si al achicar o agrandar la ventana el indice se pasa, lo corregimos
    if (indice > ultimo) {
        indice = ultimo;
    }
    if (indice < 0) {
        indice = 0;
    }

    for (let i = 0; i < tarjetas.length; i++) {
        if (i >= indice && i < indice + visibles) {
            tarjetas[i].style.display = "flex";
        } else {
            tarjetas[i].style.display = "none";
        }
    }

    // Se desactiva cada boton cuando ya no hay mas tarjetas hacia ese lado
    botonAnterior.disabled = indice === 0;
    botonSiguiente.disabled = indice >= ultimo;
}

// Mueve el carrusel una tarjeta: -1 para atras y 1 hacia adelante
function moverCarrusel(direccion) {
    indice = indice + direccion;
    mostrarCarrusel();
}

botonAnterior.addEventListener("click", () => moverCarrusel(-1));
botonSiguiente.addEventListener("click", () => moverCarrusel(1));

// Si cambia el tamaño de la ventana, cambia cuantas tarjetas entran
window.addEventListener("resize", mostrarCarrusel);

// Funcion inicial
mostrarCarrusel();
