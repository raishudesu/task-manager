// using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        // [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
    }
}