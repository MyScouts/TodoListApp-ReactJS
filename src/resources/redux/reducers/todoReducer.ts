import { type } from "os";
import { clearTodoList, setTodoList } from "../../helpers/localStorgaeHelper";
import { TodoModel } from "../../models/todoItem";
import { Action } from "../actions/todoActions";

export interface TodoState {
    todos: TodoModel[];
}

const initialSatate: TodoState = {
    todos: []
}


export const todoReducer = (state: TodoState = initialSatate, action: Action) => {
    switch (action.type) {
        case "LOAD_TODO":
            return { ...state, todos: action.payload }
        case "ADD_TODO":
            setTodoList(JSON.stringify([...state.todos, action.payload]));
            return { ...state, todos: [...state.todos, action.payload] };
        case "ADD_TODO_LIST":
        case "REMOVE_TODO":
        case "UPDATE_TODO":
            clearTodoList();
            setTodoList(JSON.stringify(action.payload));
            return { ...state, todos: action.payload };
        default:
            return state;
    }

}