import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todoReducer } from "./reducers/todoReducer";
import { todoColumnReducer } from './reducers/todoColumnReducer';
import { TodoModel } from '../models/todoItem';

export interface StoreState {
    todos: TodoModel[];
    todoColumns: TodoModel[];

}

// Combine all reducers
const reducerIndex = combineReducers({
    todos: todoReducer,
    todoColumns: todoColumnReducer
})



// middleware
const middleware = [thunk]

// Store
export const storeApp = createStore(reducerIndex, composeWithDevTools(applyMiddleware(...middleware)))