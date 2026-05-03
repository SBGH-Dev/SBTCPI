namespace WazaranPI.Api.Models
{
    // Matches Users table result
    public class User
    {
        public int UserId { get; set; }
        public string EmpCd { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string RoleName { get; set; }
    }
}