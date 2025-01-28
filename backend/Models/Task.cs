using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // For table relations

namespace backend.Models
{
    public class UserTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string TaskTitle { get; set; } = string.Empty;
        [Required]
        public required string TaskDescription { get; set; } = string.Empty;

        // Foreign key to User
        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User { get; set; } = null!;
    }
}