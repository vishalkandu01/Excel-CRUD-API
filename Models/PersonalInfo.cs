using System;
using System.ComponentModel.DataAnnotations;

namespace ExcelCRUDAPI.Models
{
    public class PersonalInfo
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime? DateOfBirth { get; set; } 

        [Required]
        public string ResidentialAddress { get; set; }

        [Required]
        public string PermanentAddress { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        public string MaritalStatus { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Occupation { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 12)]
        public string AadharCardNumber { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        public string PANNumber { get; set; }
    }
}
