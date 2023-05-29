import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo!:ITodo|undefined;
  constructor(private _TodoService:TodoService) { }

  ngOnInit() {
    this.todo = this._TodoService.getTodo()
  }

}
