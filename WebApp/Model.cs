using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp
{
    public class Employee
    {
        public int Id { get; set; }
        public int? GuestId { get; set; }
        [ForeignKey("GuestId")]
        public Guest Guest { get; set; }
        [Required]
        public string Name { get; set; }
        public bool Drink { get; set; }
    }

    public class Guest
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        [Required]
        public string Name { get; set; }
        public bool Drink { get; set; }
    }

    public class Resource
    {
        public int Id { get; set; }
    }

    public class Participant
    {
        public string Name { get; set; }
        public bool Drink { get; set; }
    }

    public class EmployeeNew : Participant
    {

    }

    public class GuestNew : Participant
    {
        public int EmployeeId { get; set; }
    }

    public class EmployeeView : Participant
    {
        public int Id { get; set; }
        public int? GuestId { get; set; }
    }

    public class GuestView : Participant
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
    }
}
