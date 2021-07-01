import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee, Guest, EmployeeNew, GuestNew } from './model';
import { Observable } from 'rxjs';

const location: string = 'https://localhost:44326/';
const content: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private client: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.client.get<Employee[]>(`${location}employee`);
  }

  getGuests(): Observable<Guest[]> {
    return this.client.get<Guest[]>(`${location}guest`);
  }

  createEmployee(employee: EmployeeNew): Observable<Object> {
    return this.client.post(`${location}employee`, employee, { headers: content });
  }

  createGuest(guest: GuestNew): Observable<Object> {
    return this.client.post(`${location}guest`, guest, { headers: content });
  }

  removeEmployee(id: number): Observable<Object> {
    return this.client.delete(`${location}employee/${id}`);
  }

  removeGuest(id: number): Observable<Object> {
    return this.client.delete(`${location}guest/${id}`);
  }
}
