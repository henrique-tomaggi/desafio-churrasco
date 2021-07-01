import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Employee, Guest } from '../model';
import { ServerService } from '../server.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[];
  guests: Guest[];
  map: Map<Employee, Guest | undefined>;
  loadComplete: boolean;

  constructor(private service: ServerService) {
    this.employees = [];
    this.guests = [];
    this.map = new Map();
    this.loadComplete = false;
  }

  findGuest(id: number | undefined): Guest | undefined {
    return !id ? undefined : this.guests.find(guest => guest.id == id);
  }

  getGuest(employee: Employee): Guest | undefined {
    return this.map.get(employee);
  }

  ngOnInit(): void {
    forkJoin({ employees: this.service.getEmployees(), guests: this.service.getGuests() }).subscribe(value => {
      this.employees = value.employees;
      this.guests = value.guests;
      for (let employee of this.employees)
        this.map.set(employee, this.findGuest(employee.guestId));
      this.loadComplete = true;
    });
  }

}
