import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: ServerService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.removeEmployee(parseInt(id)).subscribe(obj => this.router.navigate(['../list']));
    } else {
      this.router.navigate(['../list']);
    }
  }

}
