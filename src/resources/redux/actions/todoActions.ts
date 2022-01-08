import { todoList } from "../../data";
import { getTodoColumn, getTodoList, setTodoList } from "../../helpers/localStorgaeHelper";
import { TodoModel } from "../../models/todoItem";



export type Action =
    { type: "LOAD_TODO"; payload: TodoModel[] }
    | { type: "ADD_TODO", payload: TodoModel }
    | { type: "REMOVE_TODO", payload: string }
    | { type: "ADD_TODO_LIST", payload: TodoModel[] }
    | { type: "UPDATE_TODO", payload: TodoModel[] }


export const addTodoAction = (todo: TodoModel): Action => ({ type: "ADD_TODO", payload: todo });

export const addTodoListAction = (todos: TodoModel[]): Action => ({ type: "ADD_TODO_LIST", payload: todos })

export const editTodoAction = (todos: TodoModel[]): Action => ({ type: "UPDATE_TODO", payload: todos });

export const loadTodosAction = (): Action => {
    const todos = getTodoList()
    if (todos.length <= 0) {
        setTodoList(JSON.stringify(todoList))
        return { type: "LOAD_TODO", payload: todoList }
    } else {
        return { type: "LOAD_TODO", payload: todos }
    }
}

export const removeTodoAction = (todos: TodoModel[]): Action => ({ type: "ADD_TODO_LIST", payload: todos })
