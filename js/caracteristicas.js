if (sessionStorage.getItem("sesion") == null) {
    window.location.href = "../login.html"
}

if (localStorage.getItem("caracteristicas") != null) {

    let objeto = JSON.parse(localStorage.getItem("caracteristicas"))
    console.log(objeto)
    
    $(".habilidad-1").text("Habilidad 1: " + objeto.habilidad_1.toString())
    $(".habilidad-2").text("Habilidad 2: " + objeto.habilidad_2.toString())
    $(".imagen").attr("src", objeto.url_image.toString())
}