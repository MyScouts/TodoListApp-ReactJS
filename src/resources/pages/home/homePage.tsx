import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TodoColumnModel } from "../../models/todoColumn";
import { TodoModel, TODO_STATUS, TODO_TYPE } from "../../models/todoItem";
import { TodoColumn } from "../../components/todo_column/todoColumn";
import { getTodoColumn, getTodoList, setTodoColumn, setTodoList } from "../../helpers/localStorgaeHelper";
import { useSelector, useDispatch } from 'react-redux'
import { TodoState } from "../../redux/reducers/todoReducer";
import { TodoColumnsState } from "../../redux/reducers/todoColumnReducer";
import { addTodoListAction } from "../../redux/actions/todoActions";

// HOMEPAGE.TSX
interface HomePageProps {

}

export const HomePage = (props: HomePageProps) => {
    const dispatch = useDispatch()
    const todosList = useSelector((state: any) => state.todos.todos) as TodoModel[];
    console.log("🚀 ~ file: homePage.tsx ~ line 21 ~ HomePage ~ todosList", todosList)
    const todoColumnsList = useSelector((state: any) => state.todoColumns.todoColumns) as TodoColumnModel[];


    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        let columList = todoColumnsList;
        let newTodoList = todosList;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const destId = destination.droppableId;
            columList.map((column) => { if (column.columnId === destId) newTodoList[source.index].category = column.name });
        }
        const [removed] = newTodoList.splice(source.index, 1);
        newTodoList.splice(destination.index, 0, removed);
        dispatch(addTodoListAction(todosList));
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext onDragEnd={result => onDragEnd(result)} >
                {todoColumnsList.length > 0 && todoColumnsList.map((column: TodoColumnModel, index: number) => <TodoColumn column={column} todoList={todosList} />)}
            </DragDropContext>
        </div>
    )
}

