
export enum LOCAL_STORAGE_KEY {
    TODO_COLUMN = 'todoColumn',
    TODO_LIST = 'todoList',
}

export const setTodoColumn = (input: string) => localStorage.setItem(LOCAL_STORAGE_KEY.TODO_COLUMN, input)
export const getTodoColumn = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.TODO_COLUMN) ?? "[]")
export const clearTodoColumn = () => localStorage.removeItem(LOCAL_STORAGE_KEY.TODO_COLUMN)

export const setTodoList = (input: string) => localStorage.setItem(LOCAL_STORAGE_KEY.TODO_LIST, input)
export const getTodoList = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.TODO_LIST) ?? "[]")
export const clearTodoList = () => localStorage.removeItem(LOCAL_STORAGE_KEY.TODO_LIST)
