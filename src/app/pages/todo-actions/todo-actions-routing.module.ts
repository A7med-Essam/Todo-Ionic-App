import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoActionsPage } from './todo-actions.page';

const routes: Routes = [
  {
    path: '',
    component: TodoActionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoActionsPageRoutingModule {}
