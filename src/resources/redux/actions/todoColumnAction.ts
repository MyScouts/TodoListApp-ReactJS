import { todoColumnsFake } from "../../data";
import { getTodoColumn, setTodoColumn } from "../../helpers/localStorgaeHelper";
import { TodoColumnModel } from "../../models/todoColumn";

export type TodoAction =
    { type: "LOAD_TODO_COLUMN"; payload: TodoColumnModel[] }


export const loadTodoColumnsAction = (): TodoAction => {
    const todoColumns = getTodoColumn()
    if (todoColumns.length <= 0) {
        setTodoColumn(JSON.stringify(todoColumnsFake))
        return { type: "LOAD_TODO_COLUMN", payload: todoColumnsFake }
    } else {
        return { type: "LOAD_TODO_COLUMN", payload: todoColumns }
    }

}