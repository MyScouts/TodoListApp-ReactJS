import React from 'react'
import { TodoModel, TODO_STATUS, TODO_TYPE } from '../../models/todoItem'
import { Modal, Button } from 'react-bootstrap'

interface EditTodoModalProps {
    show: boolean,
    handleClose: () => void,
    todo: TodoModel,
}

export default function DetailMoal(props: EditTodoModalProps) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            keyboard={false}
            size="lg"
            className='custom-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.todo.name}
                    <span style={{
                        backgroundColor: props.todo.category === TODO_STATUS.OPEN
                            ? "#C5634D"
                            : props.todo.category === TODO_STATUS.INPROGRESS
                                ? "#4472DA"
                                : props.todo.category === TODO_STATUS.RESLOVED
                                    ? "52947C"
                                    : "#D4642F"
                    }} className='detail-type' >{props.todo.category}</span>
                    <span style={{ backgroundColor: props.todo.type === TODO_TYPE.NORMAL ? "#84920B" : "#D4642F" }} className='detail-type' >{props.todo.type}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='todo-detail'>
                    <div className='todo-date'>
                        <span ><span className='text-unline'>Start Date:</span> <span className='date-text'>{props.todo.startDate}</span></span> ~
                        <span ><span className='text-unline'>End Date:</span> <span className='date-text'>{props.todo.endDate}</span></span>
                    </div>
                    <p>{props.todo.content}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" type='submit' >Save</Button>
            </Modal.Footer>
        </Modal>
    )
}
