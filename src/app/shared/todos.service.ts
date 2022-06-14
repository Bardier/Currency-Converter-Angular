import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  competed: boolean;
  date?: any;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  public todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(tap((todos) => (this.todos = todos)));
  }

  onToggle(id: number) {
    const idx = this.todos.findIndex((t) => t.id === id);
    this.todos[idx].competed = !this.todos[idx].competed;
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
}
