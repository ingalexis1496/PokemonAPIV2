// CONFIGURACIÓN INICIAL
{
    if(sessionStorage.getItem('correo') != null && sessionStorage.getItem('usuario') != null) window.location.href = "../index.html"

    var panelRegistro = document.getElementById("panel_registro")
    var tituloOpciones = document.getElementById("titulo_opciones")
    var textoOpciones = document.getElementById("texto_opciones")
    var botonOpciones = document.getElementById("boton_opciones")
    
    panelRegistro.style.visibility = "hidden"
    
    var panelRegistroVisible = false
    
    botonOpciones.addEventListener("click", function () {
        if(!panelRegistroVisible)
        {
            tituloOpciones.innerHTML = "¿Ya tienes una cuenta?"
            textoOpciones.innerHTML = "Inicia sesión para acceder a la pagina"
            botonOpciones.innerHTML = "Iniciar sesión"
            panelRegistroVisible = true
            panelRegistro.style.visibility = "visible"
        }
        else
        {
            tituloOpciones.innerHTML = "¿Aun no tienes una cuenta?"
            textoOpciones.innerHTML = "Registrate para iniciar sesión"
            botonOpciones.innerHTML = "Regístrarse"
            panelRegistroVisible = false
            panelRegistro.style.visibility = "hidden"
        }
    })

    // Limpiar los campos cada vez que cargue...
    var email = document.getElementById("email").value = ""
    var contrasena = document.getElementById("contrasena").value = ""
}

// VALIDACION DE DATOS Y PETICIONES AL API
{
    const URLAPILOGIN = "https://localhost:7293/api/usuario/"

    function ValidarDatosLogIn()
    {
        var usuario = document.getElementById("usuario").value
        var contrasena = document.getElementById("clave").value

        if(usuario == "" || contrasena == "")
        {
            swal("Por favor llena todos los campos primero", "Advertencia", "warning")
        }
        else{
            ConsumirAPI("GET", URLAPILOGIN + usuario + "/" + contrasena)
        }
    }

    function ValidarDatosRegistro()
    {
        var email = document.getElementById("email").value
        var contrasena = document.getElementById("contrasena").value

        if(email == "" || contrasena == "")
        {
            swal("Por favor llena todos los campos primero y valida que los tipos de datos sean correctos", "Advertencia", "warning")
        }
        else
        {
            var data = {
                correo: email,
                contraseña: contrasena
            }

            ConsumirAPI("POST", data)
        }
    }

    function ConsumirAPI(accion, data)
    {
        if(accion == "POST")
        {
            fetch(URLAPILOGIN, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
            .then(response => {
                swal({
                    title: "Registro exitoso",
                    text: "Preciona Ok para continuar",
                    icon: "success"
                })
                .then(() => {
                    sessionStorage.setItem("sesion", "ok")
                    window.location.href = "../index.html"
                })
            })
        }

        if(accion == "GET")
        {
            fetch(data)
            .then(response => response.json())
            .then(data => {
                if(data.respuesta != undefined && data.respuesta == "no existe")
                {
                    var mensajeError = "El usuario no se encuentra registrado."
                    swal(mensajeError, "Error", "error")
                }
                else {
                    swal({
                        title: "Datos correctos",
                        text: "Preciona Ok para continuar",
                        icon: "success"
                    })
                    .then(() => {
                        sessionStorage.setItem("sesion", "ok")
                        window.location.href = "../index.html"
                    }) 
                }
            })
        }
    }

    var botonLogin = document.getElementById("boton_login")
    botonLogin.addEventListener("click", function () {
        ValidarDatosLogIn()
    })

    var botonRegistrarse = document.getElementById("boton_registrarse")
    botonRegistrarse.addEventListener("click", function () {
        ValidarDatosRegistro()
    })
}