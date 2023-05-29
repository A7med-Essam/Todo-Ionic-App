import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ITodo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';
import { TodoActionsPage } from '../todo-actions/todo-actions.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  todos!: ITodo[];
  loading: boolean = false;
  page: number = 1;
  constructor(
    private _NavController: NavController,
    private _PopoverController: PopoverController,
    private _TodoService: TodoService,
    private _LoadingController: LoadingController,
    private _ToastController: ToastController,
    private _Storage:Storage
  ) {}

  user:any;
  async ngOnInit() {
    await this._Storage.create();
    this.user = await this._Storage.get('ionic-user')
    this.getAllTodos();
  }

  ionViewDidEnter(){
    this.getAllTodos();
  }

  getAllTodos(event?: any) {
    event || (this.loading = true);
    this._TodoService.getAllTodos(this.page).subscribe({
      next: (res) => {
        event ? event.target.complete() : (this.loading = false);
        this.todos = this.page > 1 ? this.todos.concat(res) : res;
      },
      error: (err) => {
        event ? event.target.complete() : (this.loading = false);
      },
    });
  }

  async showOptions(event: any, index: number, todo: ITodo) {
    let pop = await this._PopoverController.create({
      component: TodoActionsPage,
      event,
      componentProps: {
        index,
        todo,
      },
    });
    await pop.present();

    let res = await pop.onDidDismiss();
    if (res.data != undefined) {
      this.deleteTodo(res.data);
    }
  }

  async deleteTodo(index: number) {
    const loader = await this._LoadingController.create({});
    await loader.present();
    this._TodoService.deleteTodo(Number(this.todos[index].id)).subscribe({
      next: async (res) => {
        await loader.dismiss();
        const toast = await this._ToastController.create({
          message: 'Item Deleted Successfully',
          duration: 3000
        });
        await toast.present();
        this.todos.splice(index, 1);
      },
      error: async (err) => {
        await loader.dismiss();
        const toast = await this._ToastController.create({
          message: 'Item Deleted Successfully',
          duration: 3000
        });
        await toast.present();
        this.todos.splice(index, 1);
      },
    });
  }

  createTodo() {
    this._TodoService.setTodo(undefined);
    this._NavController.navigateForward('/create-todo');
  }

  getDetails(todo: ITodo) {
    this._TodoService.setTodo(todo);
    this._NavController.navigateForward('/todo-details');
  }

  refreshPage(event: any) {
    this.todos = [];
    this.page = 1;
    this.getAllTodos(event);
  }

  loadTodos(event: any) {
    this.page += 1;
    this.getAllTodos(event);
  }

  trackByFn(index: number, todo: ITodo) {
    return todo.id;
  }
}
