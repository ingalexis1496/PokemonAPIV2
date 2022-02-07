using Microsoft.AspNetCore.Mvc;
using pokemon.Models.DTO;
using pokemon.Repositorio;

namespace pokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [HttpPost]
        public IActionResult CrearUsuario([FromBody] DTOUsuario usuario)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!UsuarioRepositorio.CrearUsuario(usuario))
            {
                ModelState.AddModelError("Response", "Ocurrio un error al momento de intentar guardar el usuario, por favor contacte con el administrador");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpGet("{correo}/{contrasena}")]
        public IActionResult ObtejerPersona(string correo, string contrasena)
        {

            return Ok(UsuarioRepositorio.ConsultarUsuario(correo, contrasena));
        }
    }
}
