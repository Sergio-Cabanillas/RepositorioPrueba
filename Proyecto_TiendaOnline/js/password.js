
// Funcion para que la web espere a que cargue el documento
document.addEventListener('DOMContentLoaded', function() {

    // Iniciar constantes para los campos "Contraseña" y "Repetir contraseña"
    const contraseñaInput = document.querySelector('input[name="contraseña"]');
    const confirmarContraseña = document.querySelector('input[name="confirmar_contraseña"]');

    // Iniciar constantes con el formulario y el botón de enviar para comprobar si hay errores
    const formulario = document.getElementById('form-registro');
    const submitButton = document.querySelector('button[type="submit"]');

    // Declaramos función para comprobar contraseññas
    function validarContraseña() {
        const password = contraseñaInput.value;
        const validar = confirmarContraseña.value;

    // Condicional if else para comprobar si las contraseñas no coinciden
        if (password !== confirmarContraseña) {
            contraseñaInput.style.border = '2px solid red';
            confirmarContraseña.style.border = '2px solid red';
            return false; // Si la validación falla el campo cambia borde de color rojo
        } else {
            // Cuando contraseñas coincidan la validación es correcta
            return true; // Si es correcta la validación estilo del borde se restablece
        }
    }

    // Ponemos event listeners para validar lo que hemos escrito en los campos
    contraseñaInput.addEventListener('input', validarContraseña);
    confirmarContraseña.addEventListener('input', validarContraseña);

    // Mostrar mensaje de error en el caso de que no valide
    formulario.addEventListener('submit', function(event){
        if(!validarContraseña()) {
            event.preventDefault(); // Si no valida se previene el envío del formulario
            // Escribimos el mensaje de alerta que queremos que aparezca
            alert('Las contraseñas no coinciden, vuelve a intentarlo.');
        }
    });
});