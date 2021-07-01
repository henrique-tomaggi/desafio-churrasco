import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private builder: FormBuilder, private location: Location, private router: Router, private service: ServerService) {
    this.form = this.builder.group({ name: ['', Validators.required], drink: ['true', Validators.required] })
  }

  ngOnInit(): void {
  }

  submit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      let nameInput = this.nameControl?.value;
      let drinkInput = this.drinkControl?.value;
      if (nameInput && drinkInput) {
        this.service.createGuest({ employeeId: parseInt(id), name: nameInput, drink: drinkInput === 'true' }).subscribe(obj => this.router.navigate(['../list']));
        return;
      }
    }
    this.router.navigate(['../list']);
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
