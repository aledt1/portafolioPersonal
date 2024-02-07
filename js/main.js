/* Script de validacion de campos del formulario de contacto
para enviar un correo electronico. */

let boton = document.getElementById("btnEnviar");

//evento para la validación de los campos del formulario
boton.addEventListener("click", function(event){ // evento aplicado en el boton "enviar" para ejecutar las validaciones de campos y el envio de un correo
    event.preventDefault();
    let nombre = document.getElementById("nombreForm");
    let correo = document.getElementById("correoForm");
    let telefono = document.getElementById("numeroForm");
    let mensaje = document.getElementById("mensajeForm");
    var formulario = document.getElementById("formulario");
    var alertaError = document.getElementById("alertaError");

//constante flag para verificar si todos los campos pasan la validación para realizar el envio del correo
    const flag = {
        nombre: false,
        correo: false,
        telefono: false,
        mensaje: false
    }

//VALIDACION DEL CAMPO NOMBRE COMPLETO
/* CONDICIONES INICIALES
1. Valida si el campo contiene una longuitud entre 3 a 30 caracteres
2. Valida si el campo no está vacio
3. Valida si el primer caracter del campo no esta compuesto de un espacio vacio */
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
    if ((nombre.value.length >= 3) && (nombre.value.length < 30) && !(nombre.value.trim() == "") && (nombre.value[0] != " ")){
        nombre.classList.add("is-valid");
        flag.nombre = true;
    } else {
        nombre.classList.remove("is-valid");
        nombre.classList.add("is-invalid");
        flag.nombre = false;
    }
/* Validacion de la cadena de texto para que solo admita
1. Valores ASCII entre el rango (65, 90), minusculas y mayusculas, excluye numeros y caracteres especiales
2. Espacio entre palabras de los nombres propios: "Dante Hart"
2. Acentos para el uso de la lengua Española*/
    for (let i = 0; i < nombre.value.length; i++){
        if (((nombre.value.toUpperCase().charCodeAt(i) < 65) || (nombre.value.toUpperCase().charCodeAt(i) > 90)) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 32) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 193) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 201) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 205) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 211) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 218) &&
        (nombre.value.toUpperCase().charCodeAt(i) != 209)){
            nombre.classList.remove("is-valid");
            nombre.classList.add("is-invalid");
            flag.nombre = false;
            break;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        }
    }

//VALIDACIÓN DEL CAMPO CORREO ELECTRÓNICO
/* Funcion que evalua un conjunto de caracteres para validar si es un correo electronico
mediante el uso de expresiones regulares usadas para correo */
    function validarCorreo(email) {
        let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let check = expReg.test(email);
        if (check){
            correo.classList.remove("is-invalid");
            correo.classList.add("is-valid");
            flag.correo = true;
        } else {
            correo.classList.remove("is-valid");
            correo.classList.add("is-invalid");
            flag.correo = false;
        }
    }
    validarCorreo(correo.value);

//VALIDACIÓN DEL CAMPO NÚMERO TELEFÓNICO
/* CONDICIONES
1. Validar si el campo contiene exactamente 10 caracteres
2. Validar que el campo este compuesto de solo números
3. Validar que el campo no sea cero
4. Validar que el campo no este vacio
5. Validar que el primer elemento del canjunto no sea un espacio vacio*/
    if ((telefono.value.length == 10) && (!isNaN(telefono.value)) && (telefono.value != 0) && !(telefono.value.trim() == "") && (telefono.value[0] != " ")){
        telefono.classList.remove("is-invalid");
        telefono.classList.add("is-valid");
        flag.telefono = true;
    } else {
        telefono.classList.remove("is-valid");
        telefono.classList.add("is-invalid");
        flag.telefono = false;
    }

//VALIDACIÓN DEL CAMPO MENSAJE
/* CONDICIONES INICIALES
1. Valida si el campo contiene una longuitud entre 10 a 600 caracteres
2. Valida si el campo no está vacio
3. Valida si el primer caracter del campo no esta compuesto de un espacio vacio */
    if ((mensaje.value.length >= 10) && (mensaje.value.length <= 600) && !(mensaje.value.trim() == "") && (mensaje.value[0] != " ")){
        mensaje.classList.remove("is-invalid"),
        mensaje.classList.add("is-valid");
        flag.mensaje = true;
    } else {
        mensaje.classList.remove("is-valid");
        mensaje.classList.add("is-invalid");
        flag.mensaje = false;
    }

//Alerta general
    if (flag.nombre && flag.correo && flag.telefono && flag.mensaje){
        function envioCorreo(){
            let plantillaCorreo = '¡Hola!, soy ' + nombre.value + '<br/>' +
            'Me gustaría saber más sobre tu trabajo. <br/><br/>' +
            '<strong>Datos del cliente</strong> <br/>' +
            'Correo electrónico: ' + correo.value +
            '<br/> Teléfono: ' + telefono.value +
            '<br/> Mensaje: ' + mensaje.value;
            //smtpjs script
            Email.send({
                Host : "smtp.elasticemail.com",
                Username : "aledt2103@gmail.com",
                Password : "B91E884D9ED0D215FAC06023B7947AC64C7E",
                To : 'ale_dt1@hotmail.com',
                From : "aledt2103@gmail.com",
                Subject : "SOLICITUD DE CONTACTO",
                Body : plantillaCorreo
            }).then(
              message => {
                if (message == 'OK'){
                    CORREO_ENVIADO();
                } else{
                    CORREO_NO_ENVIADO();
                }
              });
        }
        envioCorreo();
        //reseteo del formulario
        formulario.reset();
        nombre.classList.remove("is-valid");
        correo.classList.remove("is-valid");
        telefono.classList.remove("is-valid");
        mensaje.classList.remove("is-valid");
    } else {
        CORREO_NO_ENVIADO();
        alertaError.style.display = "block";
        setTimeout(() => {
            alertaError.style.display = "none"
        }, (5000)); 
    }

}); // Evento click

//Alerta de envio de correo por sweetalert
const CORREO_ENVIADO = () =>{
    Swal.fire({
        position: 'center',
        color: '#19100e',
        background: '#e6e8ef',
        icon: 'success',
        title: '¡Gracias!',
        text: 'Tu mensaje ha sido enviado exitosamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#19100e',
        showConfirmButton: true,
        showCloseButton: true,
      });
};

const CORREO_NO_ENVIADO = () =>{
    Swal.fire({
        position: 'center',
        color: '#19100e',
        background: '#e6e8ef',
        icon: 'error',
        title: 'Lo sentimos, hubo un error al enviar el mensaje.',
        text: 'Inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#19100e',
        showConfirmButton: true,
        showCloseButton: true,
      }); 
}



