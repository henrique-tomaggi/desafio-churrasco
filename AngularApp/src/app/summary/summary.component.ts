import { Input, Component, OnInit } from '@angular/core';
import { Employee, Guest, Participant } from '../model';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() context: Map<Employee, Guest | undefined>;
  food: number;
  drink: number;
  sum: number;

  constructor() {
    this.context = new Map<Employee, Guest>();
    this.food = 0;
    this.drink = 0;
    this.sum = 0;
  }

  ngOnInit(): void {
    this.context.forEach((guest, employee) => {
      let foodAddition = this.calculateFood(employee) + (guest ? this.calculateFood(guest) : 0);
      let drinkAddition = this.calculateDrink(employee) + (guest ? this.calculateDrink(guest) : 0);
      this.food += foodAddition;
      this.drink += drinkAddition;
      this.sum += foodAddition + drinkAddition;
    });
  }

  calculateFood(participant: Participant): number {
    return 20;
  }

  calculateDrink(participant: Participant): number {
    return participant.drink ? 20 : 0;
  }
}
