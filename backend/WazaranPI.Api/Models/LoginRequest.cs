namespace WazaranPI.Api.Models
{
    // Data coming from frontend login form
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}