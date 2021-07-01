import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: ServerService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.removeGuest(parseInt(id)).subscribe(obj => this.router.navigate(['../list']));
    } else {
      this.router.navigate(['../list']);
    }
  }

}
