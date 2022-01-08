import React, { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import { TodoColumnModel } from '../../models/todoColumn';
import { TodoModel, TODO_STATUS } from '../../models/todoItem';
import { TodoCard } from '../todo_card/todoCard';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './todoColumn.scss'
import TodoColumnCreateModal from './todoColumnCreateModal';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux'

// 
interface TodoColumnProps {
    column: TodoColumnModel,
    todoList: TodoModel[],
}


export const TodoColumn = (props: TodoColumnProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const todosList = useSelector((state: any) => state.todos.todos) as TodoModel[];


    return (
        <>
            <div className='todo-column'
                style={{}}
                key={props.column.columnId}>
                <div
                    className='todo-colum-header'>
                    <div className='icon-header'
                        style={{ backgroundColor: props.column.color }} />
                    <h2>{props.column.name}</h2>
                    {/* <div className='todo-count'>{todosList.filter((item: TodoModel, index: number) => item.category == props.column.name).length}</div> */}
                </div>
                <div className='todo-column-content'>
                    {
                        props.column.name === TODO_STATUS.OPEN &&
                        (<div className='add-todo-button' onClick={() => handleShow()}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <p>Add issue...</p>
                        </div>)
                    }
                    <Droppable droppableId={props.column.columnId} key={props.column.columnId}>
                        {(provided, snapshot) =>
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={``}
                                style={{}}>
                                {props.todoList !== undefined && props.todoList.length > 0
                                    && props.todoList.map((item: TodoModel, index: number) => item.category === props.column.name && <TodoCard todo={item} index={index} />)}
                                {provided.placeholder}
                            </div>
                        }
                    </Droppable>
                </div>
            </div>
            <TodoColumnCreateModal show={show} handleClose={handleClose} key={uuid()} />

        </>
    );
}
