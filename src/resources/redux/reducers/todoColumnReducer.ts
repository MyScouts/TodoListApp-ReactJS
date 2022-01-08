import { TodoColumnModel } from "../../models/todoColumn";
import { TodoAction } from "../actions/todoColumnAction";

export interface TodoColumnsState {
    todoColumns: TodoColumnModel[];
}

const initialSatate: TodoColumnsState = {
    todoColumns: []
}


export const todoColumnReducer = (state: TodoColumnsState = initialSatate, action: TodoAction) => {
    switch (action.type) {
        case "LOAD_TODO_COLUMN":
            return { ...state, todoColumns: action.payload }
        default:
            return state;
    }

}