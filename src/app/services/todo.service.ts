import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../interfaces/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todo: ITodo | undefined;
  constructor(private http: HttpClient) {}

  getTodo() {
    return this.todo;
  }

  setTodo(body: ITodo | undefined) {
    this.todo = body;
  }

  getAllTodos(page:number): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(environment.baseUrl + `todos?_page=${page}`);
  }

  createTodo(todo: ITodo) {
    return this.http.post(environment.baseUrl + 'todos', todo);
  }

  updateTodo(todo: ITodo) {
    return this.http.put(environment.baseUrl + 'todos/' + todo.id, todo);
  }

  deleteTodo(id:number) {
    return this.http.delete(environment.baseUrl + `todos/${id}`);
  }
}