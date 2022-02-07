using pokemon.Models.DTO;
using System.Data;
using System.Data.SqlClient;

namespace pokemon.Repositorio
{
    public static class UsuarioRepositorio
    {
        private static readonly string cadenaConexion = @"Data Source=DESKTOP-E80IQ5F;Initial Catalog=pokemon;Integrated Security=True";

        public static bool CrearUsuario (DTOUsuario usuario)
        {
            using   SqlConnection conexion = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand("SP_RegistrarUsuario", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@correo", usuario.Correo);
            cmd.Parameters.AddWithValue("@contrasena", usuario.Contraseña);
           
            try
            {
                conexion.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                conexion.Close();
            }
        }

        public static string ConsultarUsuario(string correo, string contrasena)
        {
            DTOUsuario usuario = new DTOUsuario();
            using SqlConnection conexion = new SqlConnection(cadenaConexion);
            SqlCommand cmd = new SqlCommand("SP_ConsultarUsuario", conexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@correo", correo);
            cmd.Parameters.AddWithValue("@contrasena", contrasena);

            try
            {
                conexion.Open();
                cmd.ExecuteNonQuery();
                using SqlDataReader datos = cmd.ExecuteReader();
                datos.Read();
                return datos["response"].ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                conexion.Close();
            }
        }
    }
}
