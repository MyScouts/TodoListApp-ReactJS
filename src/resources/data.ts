import { TodoModel, TODO_STATUS, TODO_TYPE } from "./models/todoItem";
import { v4 as uuid } from 'uuid';
import { TodoColumnModel } from "./models/todoColumn";

export const todoList: TodoModel[] = [
    {
        todoId: uuid(),
        name: "Example todo",
        type: TODO_TYPE.NORMAL,
        startDate: "2020-01-01",
        endDate: "2020-01-01",
        category: TODO_STATUS.OPEN,
        content: "Example description"
    },
]


export const todoColumnsFake: TodoColumnModel[] = [
    {
        columnId: uuid(),
        name: TODO_STATUS.OPEN,
        color: "#C5634D"

    },
    {
        columnId: uuid(),
        name: TODO_STATUS.INPROGRESS,
        color: "#4472DA"
    }, {
        columnId: uuid(),
        name: TODO_STATUS.RESLOVED,
        color: "#52947C"

    }, {
        columnId: uuid(),
        name: TODO_STATUS.CLOSE,
        color: "#84920B"
    }
]