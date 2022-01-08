import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { convertDateToString } from '../../helpers/dateTimeHelper';
import { TodoModel, TODO_TYPE } from '../../models/todoItem';
import './todoCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import TodoDeleTeConfirmModal from './deleteConfrimModal';
import { EditTodoModal } from './editTodoModal';
import DetailMoal from './detailMoal';

interface TodoCardProps {
    todo: TodoModel,
    index: number,
}

export const TodoCard = (props: TodoCardProps) => {

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShow = () => setShow(true);
    const handleCloseDetele = () => setShowDelete(false);
    const handleCloseEdit = () => setShowEdit(false);

    return (
        <>
            <div>
                <Draggable
                    key={props.todo.todoId}
                    draggableId={props.todo.todoId}
                    index={props.index}>
                    {(provided, snapshot) =>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`todo-card {snapshot.isDragging && 'isDragging'}`}
                            style={{ ...provided.draggableProps.style }}>
                            <div className='card-content'>
                                <div className='card-todo-header'>
                                    <div className='type' style={{ backgroundColor: props.todo.type === TODO_TYPE.NORMAL ? "#84920B" : "#D4642F" }}>{props.todo.type}</div>
                                    <div className='action'>
                                        <FontAwesomeIcon icon={faEdit} className='ic-edit icon' onClick={() => setShowEdit(true)} />
                                        <FontAwesomeIcon icon={faTrash} className='ic-trash icon' onClick={() => setShowDelete(true)} />
                                    </div>
                                </div>
                                <p className='title' onClick={() => setShow(true)}>{props.todo.name}</p>
                                <p className='description'>{props.todo.content}</p>
                                <p className='due-date'>Due date:  <span>{props.todo.endDate && convertDateToString(new Date(props.todo.endDate))}</span></p>
                            </div>
                        </div>
                    }
                </Draggable>
            </div>

            <TodoDeleTeConfirmModal handleClose={() => handleCloseDetele()} show={showDelete} todo={props.todo} />
            <EditTodoModal handleClose={() => handleCloseEdit()} show={showEdit} todo={props.todo} />
            <DetailMoal handleClose={() => setShow(false)} show={show} todo={props.todo} />
        </>
    )
}
