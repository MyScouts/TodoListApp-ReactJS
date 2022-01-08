export enum TODO_TYPE {
    NORMAL = 'NORMAL',
    IMPORTANT = 'IMPORTANT',

}

export enum TODO_STATUS {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    RESLOVED = 'RESLOVED',
    CLOSE = 'CLOSE',
}

export interface TodoModel {
    todoId: string;
    name: string;
    type: TODO_TYPE;
    startDate: string | null;
    endDate: string | null;
    category: string;
    content: string;
}