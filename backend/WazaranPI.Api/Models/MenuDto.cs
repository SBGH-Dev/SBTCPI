namespace WazaranPI.Api.Models
{
    // Data returned to frontend menu
    public class MenuDto
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string MenuUrl { get; set; }
        public string Icon { get; set; }
    }
}