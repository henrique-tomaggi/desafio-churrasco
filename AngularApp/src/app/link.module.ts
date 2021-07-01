import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { InviteComponent } from './invite/invite.component';
import { RemoveComponent } from './remove/remove.component';
import { CancelComponent } from './cancel/cancel.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'invite/:id', component: InviteComponent },
      { path: 'remove/:id', component: RemoveComponent },
      { path: 'cancel/:id', component: CancelComponent },
      { path: '', redirectTo: '/list', pathMatch: 'full' },
      { path: '**', component: ErrorComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class LinkModule { }
