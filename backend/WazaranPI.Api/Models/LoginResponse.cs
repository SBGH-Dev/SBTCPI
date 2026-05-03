namespace WazaranPI.Api.Models
{
    // Data returned to frontend after successful login
    public class LoginResponse
    {
        public string EmpCd { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string RoleName { get; set; }
    }
}