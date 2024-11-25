import { Carrusel } from "./carrusel/carrusel.js";
import { listarProductos } from "./listarProductos/listarProductos.js";
import { vistaProducto } from "./listarProductos/vistaProducto.js";
import { getUsuarioAutenticado, login, mostrarUsuario, register, setUsuarioAutenticado } from "./login/login.js";

export function RouterTienda() {
    let session = getUsuarioAutenticado();
    setSession(session);
    let hash = location.hash;
    const currentTheme = localStorage.getItem('theme') || 'day';
    const toggleButton = document.getElementById('cambiarTema');

    if (currentTheme === 'night') {
        document.body.classList.add('night-mode');
        toggleButton.checked = true; 
        document.getElementById('cambiarTema').setAttribute('aria-checked', 'true');
        document.getElementById('cambiarTema').innerText = 'Modo Día'; 
    } else {
        document.body.classList.remove('night-mode');
        toggleButton.checked = false; // El checkbox está desactivado (modo día)
        document.getElementById('cambiarTema').setAttribute('aria-checked', 'false');
        document.getElementById('cambiarTema').innerText = 'Modo Noche'; 
    }


    toggleButton.addEventListener('change', function () {
        if (toggleButton.checked) {
            document.body.classList.add('night-mode');
            localStorage.setItem('theme', 'night'); 
            document.getElementById('cambiarTema').innerText = 'Modo Día'; 
        } else {

            document.body.classList.remove('night-mode');
            localStorage.setItem('theme', 'day'); 
            document.getElementById('cambiarTema').innerText = 'Modo Noche'; 
        }
    });

    if (hash === '#vistaProducto') {

        vistaProducto();

    } else if (hash === '#login') {

        login();
    } else if (hash === '#register') {

        register();

    } else if (hash === '#logout') {

        setUsuarioAutenticado(false, -1);
        location.replace("tienda.html");

    } else if (hash === '') {

        Carrusel();
        listarProductos();

    }
    console.log(hash);
}

function setSession(session) {
    /**
     * Esta función se utiliza para recuperar los datos de sessión cada vez que se recarga la página.
     */
    let d = document;
    if (session.autenticado) {
        mostrarUsuario(session.email);

    }


}

export function showAlert(message, type = 'info', duration = 5000) {
    const alertContainer = document.getElementById('alertContainer');

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.classList.add('fade-out');

        alert.addEventListener('animationend', () => {
            alert.remove();
        });
    }, duration);
}


/* Aca creamos una nueva funcion que nos permite formatear el precio traido desde la base de datos a pesos Argentinos */
export function formatPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(precio);
  }

