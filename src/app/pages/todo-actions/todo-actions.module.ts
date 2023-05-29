import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoActionsPageRoutingModule } from './todo-actions-routing.module';

import { TodoActionsPage } from './todo-actions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoActionsPageRoutingModule
  ],
  declarations: [TodoActionsPage]
})
export class TodoActionsPageModule {}
