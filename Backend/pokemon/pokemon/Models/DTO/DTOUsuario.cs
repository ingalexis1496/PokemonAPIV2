using System.ComponentModel.DataAnnotations;

namespace pokemon.Models.DTO
{
    public class DTOUsuario
    {   
        [Required]
        public string? Correo { get; set; }
        [Required]
        public string? Contraseña { get; set; }
    }
}
