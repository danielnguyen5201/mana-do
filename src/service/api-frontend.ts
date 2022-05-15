import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import shortid from "shortid";

class ApiFrontend extends IAPI {
    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: "firstUser",
        } as Todo);
    }

    getTodos(): any {
        const todosInStorage = localStorage.getItem('todos')
        return todosInStorage ? JSON.parse(todosInStorage) : []
    }

    setTodos(todos: Array<Todo>): void {
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}

export default new ApiFrontend();
