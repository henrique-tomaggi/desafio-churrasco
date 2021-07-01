using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp
{
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly Storage Storage;

        public ServerController(Context context) => Storage = new Storage(context);

        [HttpGet("/employee")]
        public async Task<ActionResult<List<EmployeeView>>> GetEmployees()
        {
            var list = await Storage.GetEmployees();
            var view = new List<EmployeeView>();
            foreach (var employee in list)
                view.Add(new EmployeeView { Id = employee.Id, GuestId = employee.GuestId, Name = employee.Name, Drink = employee.Drink });
            return view;
        }

        [HttpGet("/guest")]
        public async Task<ActionResult<List<GuestView>>> GetGuests()
        {
            var list = await Storage.GetGuests();
            var view = new List<GuestView>();
            foreach (var guest in list)
                view.Add(new GuestView { Id = guest.Id, EmployeeId = guest.EmployeeId, Name = guest.Name, Drink = guest.Drink });
            return view;
        }

        [HttpGet("/employee/{id}")]
        public async Task<ActionResult<EmployeeView>> GetEmployee(int id)
        {
            var employee = await Storage.GetEmployeeById(id);
            if (employee is null)
                return NotFound();
            return new EmployeeView { Id = employee.Id, GuestId = employee.GuestId, Name = employee.Name, Drink = employee.Drink };
        }

        [HttpGet("/guest/{id}")]
        public async Task<ActionResult<GuestView>> GetGuest(int id)
        {
            var guest = await Storage.GetGuestById(id);
            if (guest is null)
                return NotFound();
            return new GuestView { Id = guest.Id, EmployeeId = guest.EmployeeId, Name = guest.Name, Drink = guest.Drink };
        }

        [HttpPost("/employee")]
        public async Task<ActionResult> AddEmployee(EmployeeNew participant)
        {
            if (participant.Name is null)
                return BadRequest();
            var employee = await Storage.AddEmployee(participant);
            return CreatedAtAction(nameof(GetEmployee), new Resource { Id = employee.Id }, null);
        }

        [HttpPost("/guest")]
        public async Task<ActionResult> AddGuest(GuestNew participant)
        {
            if (participant.Name is null)
                return BadRequest();
            var employee = await Storage.GetEmployeeById(participant.EmployeeId);
            if (employee is null)
                return NotFound();
            if (!(employee.Guest is null))
                return Conflict();
            var guest = await Storage.AddGuestToEmployee(employee, participant);
            return CreatedAtAction(nameof(GetGuest), new Resource { Id = guest.Id }, null);
        }

        [HttpDelete("/employee/{id}")]
        public async Task<ActionResult> RemoveEmployee(int id)
        {
            var employee = await Storage.GetEmployeeById(id, false);
            if (employee is null)
                return NotFound();
            await Storage.RemoveEmployee(employee);
            return NoContent();
        }

        [HttpDelete("/guest/{id}")]
        public async Task<ActionResult> RemoveGuest(int id)
        {
            var guest = await Storage.GetGuestById(id);
            if (guest is null)
                return NotFound();
            await Storage.RemoveGuestFromEmployee(guest.Employee, guest);
            return NoContent();
        }
    }
}