using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Online_store_for_pizzeria.Server.Models
{
    public class User : IdentityUser<int>
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        [JsonIgnore]
        public Customer Customer { get; set; }

        [NotMapped]
        public override string UserName { get; set; }

        [NotMapped]
        public override string NormalizedUserName { get; set; }

        [NotMapped]
        public override string NormalizedEmail { get; set; }

        [NotMapped]
        public override bool EmailConfirmed { get; set; }

        [NotMapped]
        public override string PasswordHash { get; set; }

        [NotMapped]
        public override string SecurityStamp { get; set; }

        [NotMapped]
        public override string ConcurrencyStamp { get; set; }

        [NotMapped]
        public override string PhoneNumber { get; set; }

        [NotMapped]
        public override bool PhoneNumberConfirmed { get; set; }

        [NotMapped]
        public override bool TwoFactorEnabled { get; set; }

        [NotMapped]
        public override DateTimeOffset? LockoutEnd { get; set; }

        [NotMapped]
        public override bool LockoutEnabled { get; set; }

        [NotMapped]
        public override int AccessFailedCount { get; set; }
    }
}