import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder, private location: Location, private router: Router, private service: ServerService) {
    this.form = this.builder.group({ name: ['', Validators.required], drink: ['true', Validators.required] })
  }

  ngOnInit(): void {
  }

  submit(): void {
    let nameInput = this.nameControl?.value;
    let drinkInput = this.drinkControl?.value;
    if (nameInput && drinkInput) {
      this.service.createEmployee({ name: nameInput, drink: drinkInput === 'true' }).subscribe(obj => this.router.navigate(['../list']));
    } else {
      this.router.navigate(['../list']);
    }
  }

  cancel(): void {
    this.location.back();
  }

  get nameControl(): AbstractControl | null {
    return this.form.get('name');
  }

  get drinkControl(): AbstractControl | null {
    return this.form.get('drink');
  }
}
