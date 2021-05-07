import { action, makeObservable, observable } from "mobx";
import TodoModel from "./TodoModel";


export default class TodoStore {
  @observable
  todos: TodoModel[] = [];

  private todoAPI = 'http://localhost:8080/api/ToDo';

  //key point
  constructor() {
    makeObservable(this)
  }

  @action
  async init() {
    let response = await fetch(this.todoAPI);
    let newToDos: TodoModel[] = await response.json();
    this.addToDoToStore(newToDos);
  }

  @action
  addToDoToStore(ToDos: TodoModel[]) {
    this.todos.length = 0;
    for (let todo of ToDos) {
      this.todos.push(todo);
    }
  }

  @action.bound
  getTodos() {
    return this.todos;
  }

  @action.bound
  async addTodo(title: string, isCompleted: boolean) {
    let response = await fetch(this.todoAPI, {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, isCompleted }),
    });
    let createdToDo = await response.json();
    this.addNewToDoToStore(createdToDo);
  }

  @action.bound
  async addNewToDoToStore(todo: TodoModel) {
    this.todos.push(todo);
  }
}