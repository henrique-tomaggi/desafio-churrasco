using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp
{
    public class Storage
    {
        private readonly Context Context;

        public Storage(Context context) => Context = context;

        public async Task<Employee> AddEmployee(Participant participant)
        {
            var employee = new Employee { Name = participant.Name, Drink = participant.Drink };
            Context.Employee.Add(employee);
            await Context.SaveChangesAsync();
            return employee;
        }

        public async Task RemoveEmployee(Employee employee)
        {
            Context.Employee.Remove(employee);
            await Context.SaveChangesAsync();
        }

        public async Task<Guest> AddGuestToEmployee(Employee employee, Participant participant)
        {
            var guest = new Guest { Name = participant.Name, Drink = participant.Drink, Employee = employee };
            employee.Guest = guest;
            Context.Guest.Add(guest);
            Context.Employee.Update(employee);
            await Context.SaveChangesAsync();
            return guest;
        }

        public async Task RemoveGuestFromEmployee(Employee employee, Guest guest)
        {
            employee.Guest = null;
            Context.Employee.Update(employee);
            Context.Guest.Remove(guest);
            await Context.SaveChangesAsync();
        }

        public async Task<Employee> GetEmployeeById(int id, bool track = true)
        {
            var employee = await Context.Employee.FindAsync(id);
            if (employee is null)
                return null;
            if (track)
                await Context.Entry(employee).Reference(nameof(Employee.Guest)).LoadAsync();
            return employee;
        }

        public async Task<Guest> GetGuestById(int id, bool track = true)
        {
            var guest = await Context.Guest.FindAsync(id);
            if (guest is null)
                return null;
            if (track)
                await Context.Entry(guest).Reference(nameof(Guest.Employee)).LoadAsync();
            return guest;
        }

        public async Task<List<Employee>> GetEmployees() => await Context.Employee.Include(nameof(Employee.Guest)).ToListAsync();

        public async Task<List<Guest>> GetGuests() => await Context.Guest.Include(nameof(Guest.Employee)).ToListAsync();
    }
}
