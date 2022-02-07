if (sessionStorage.getItem("sesion") == null) {
    window.location.href = "../login.html"
}

// TRAER POKEMONES
const api = 'https://pokeapi.co/api/v2/pokemon'

function consultarListaPokemones () {
    return fetch(api)
}

function consultarCaracteristicas (url) {
    return fetch(url)
}

async function pintarPokemones () {
    try {
        let response = await consultarListaPokemones()
        let listaPokemones = await response.json()

        let i = 0;
        let fila = 1

        $('tbody').append(
            "<tr id = 'fila-"+fila+"'></tr>"
        )

        for (pokemon of listaPokemones.results) {
            if (i < 4) {
                $('#fila-'+fila).append(
                    `<td onclick="pintarCaracteristicas('${pokemon.url}')"> ${pokemon.name}</td>`
                )
                i++
            }
            else {
                fila++

                $('tbody').append(
                    "<tr id = 'fila-"+fila+"'></tr>"
                )

                $('#fila-'+fila).append(
                    `<td onclick="pintarCaracteristicas('${pokemon.url}')"> ${pokemon.name}</td>`
                )

                i = 1
            }
        }
    }
    catch {
        console.log(new Error(`Ocurrio un error al momento de consultar el api: ${api}`))
    }
}

async function pintarCaracteristicas (url) {
    try {
        let response = await consultarCaracteristicas(url)
        let caracteristicas = await response.json()

        let objeto = {
            habilidad_1: caracteristicas.abilities[0].ability.name,
            habilidad_2: caracteristicas.abilities[1].ability.name,
            url_image: caracteristicas.sprites.versions["generation-v"]["black-white"]["animated"]["front_shiny"]
        }

        localStorage.setItem("caracteristicas", JSON.stringify(objeto))

        window.location.href = "./caracteristicas.html";
    }
    catch {
        console.log(new Error(`Ocurrio un error al momento de consultar el api: ${url}`))
    }
}

pintarPokemones()