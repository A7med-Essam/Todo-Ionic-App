import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  PopoverController,
} from '@ionic/angular';
import { ITodo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-actions',
  templateUrl: './todo-actions.page.html',
  styleUrls: ['./todo-actions.page.scss'],
})
export class TodoActionsPage implements OnInit {
  constructor(
    private _PopoverController: PopoverController,
    private _AlertController: AlertController,
    private _TodoService: TodoService,
    private _NavController: NavController
  ) {}

  @Input() index!: number;
  @Input() todo!: ITodo;

  ngOnInit() {}

  async deleteTodo(index: number) {
    let alert = await this._AlertController.create({
      header: 'Confirm Deleting',
      message: 'Are you sure that you want to perform deleting?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: () => {
            this._PopoverController.dismiss(index);
          },
        },
      ],
    });
    await alert.present();
  }

  editTodo(todo: ITodo) {
    this._TodoService.setTodo(todo);
    this._PopoverController.dismiss();
    this._NavController.navigateForward('/create-todo');
  }
}
