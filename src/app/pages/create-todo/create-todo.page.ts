import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { ITodo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  todoForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _NavController: NavController,
    private _TodoService: TodoService,
    private _LoadingController: LoadingController,
    private _ToastController: ToastController
  ) {}

  ngOnInit() {
    this.createTodoForm();
    this.patchForm();
  }

  currentTodo!: ITodo | undefined;
  patchForm() {
    this.currentTodo = this._TodoService.getTodo();
    if (this.currentTodo) {
      this.todoForm.setValue({
        title: this.currentTodo.title,
        desc: this.currentTodo.desc,
        id: this.currentTodo.id,
      });
    }
  }

  createTodoForm() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      id: '',
    });
  }

  async onSubmit(form: FormGroup) {
    if (form.valid) {
      let loading = await this._LoadingController.create({});
      await loading.present();
      if (this.currentTodo) {
        this.onEdit(form, loading);
      } else {
        this.onCreate(form, loading);
      }
    }
  }

  onCreate(form: FormGroup, loading: HTMLIonLoadingElement) {
    const todo:ITodo = {
      ...form.value,
      date:new Date()
    }
    this._TodoService.createTodo(todo).subscribe({
      next: async (res) => {
        await loading.dismiss();
        let toast = await this._ToastController.create({
          message: 'Data Saved Successfully',
          duration: 3000
        });
        await toast.present();
        this._NavController.pop();
      },
      error: async (err) => {
        await loading.dismiss();
        let toast = await this._ToastController.create({
          message: err.message,
          header: 'Error Occurred!',
          duration: 3000
        });
        await toast.present();
      },
    });
  }

  onEdit(form: FormGroup, loading: HTMLIonLoadingElement) {
    const todo:ITodo = {
      ...form.value,
      date:new Date()
    }
    this._TodoService.updateTodo(todo).subscribe({
      next: async (res) => {
        await loading.dismiss();
        let toast = await this._ToastController.create({
          message: 'Data Updated Successfully',
          duration: 3000
        });
        await toast.present();
        this._NavController.pop();
      },
      error: async (err) => {
        await loading.dismiss();
        let toast = await this._ToastController.create({
          message: err.message,
          header: 'Error Occurred!',
          duration: 3000
        });
        await toast.present();
      },
    });
  }
}
