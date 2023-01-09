// Variables globales
var boton = document.getElementById("btnEnviar");
var nombre = document.getElementById("nombreForm");
var correo = document.getElementById("correoForm");
var telefono = document.getElementById("numeroForm");
var mensaje = document.getElementById("mensajeForm");
var formulario = document.getElementById("formulario");
var alertaError = document.getElementById("alertaError");

//evento para la validación de los campos del formulario
boton.addEventListener("click", function(event){
    event.preventDefault();

    //constante flag para verificar
    const flag = {
        nombre: false,
        correo: false,
        telefono: false,
        mensaje: false
    }

    //validacion nombre
    //nombre.classList.remove("is-invalid");
    //nombre.classList.add("is-valid");

    if ((nombre.value.length >= 3) && (nombre.value.length <30) && (nombre.value.trim() == "") && (nombre.value[0] != " ")){
        nombre.classList.add("is-valid");
        flag.nombre = true;
    } else {
        nombre.classList.add("is-invalid");
        flag.nombre = false;
    }

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

    //validacion correo
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

    //validacion telefono
    if ((telefono.value.length == 10) && 
    (!isNaN(telefono.value)) && 
    (telefono.value != 0) && 
    (telefono.value.trim() == "") && 
    (telefono.value[0] != " ")){
        telefono.classList.remove("is-invalid");
        telefono.classList.add("is-valid");
        flag.telefono = true;
    } else {
        telefono.classList.remove("is-valid");
        telefono.classList.add("is-invalid");
        flag.telefono = false;
    }

    //validacion mensaje
    if ((mensaje.value.length >= 10) && (mensaje.value.length <= 600) && (mensaje.value.trim() == "") && (mensaje.value[0] != " ")){
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
        function enviarCorreo(){
            let cuerpoEmail = '¡Hola!, soy ' + nombre.value + 'Me gustaría trabajar contigo. <br/><br/>' +
            '<strong>Datos del cliente</strong> <br/>' +
            'Correo electrónico: ' + correo.value +
            '<br/> Teléfono: ' + telefono.value +
            '<br/> Mensaje: ' + mensaje.value;

            //smtpjs script
            Email.send({
                Host : "smtp.elasticemail.com",
                Username : "aledt2103@gmail.com",
                Password : "F52365101A002BF8F8A26DC4B5233AA56059",
                To : 'ale_dt1@hotmail.com',
                From : "aledt2103@gmail.com",
                Subject : "MENSAJE NUEVO CLIENTE",
                Body : cuerpoEmail
            }).then(
              message => {
                if (message == 'OK'){
                    CORREO_ENVIADO();
                } else{
                    CORREO_NO_ENVIADO();
                }
              });
        }
        console.log(enviarCorreo());
        enviarCorreo();
        //CORREO_ENVIADO();

        //reseteo del formulario
        formulario.reset();
        nombre.classList.remove("is-valid");
        correo.classList.remove("is-valid");
        telefono.classList.remove("is-valid");
        mensaje.classList.remove("is-valid");
    } else {
        //CORREO_NO_ENVIADO();
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
        color: '#A97798',
        background: '#F9F9F9',
        icon: 'success',
        title: '¡Gracias!',
        text: 'Tu mensaje ha sido enviado exitosamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#A058A1',
        showConfirmButton: true,
        showCloseButton: true,
      });
};

const CORREO_NO_ENVIADO = () =>{
    Swal.fire({
        position: 'center',
        color: '#A97798',
        background: '#F9F9F9',
        icon: 'error',
        title: 'Lo sentimos, hubo un error al enviar el mensaje.',
        text: 'Inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#A058A1',
        showConfirmButton: true,
        showCloseButton: true,
      }); 
};