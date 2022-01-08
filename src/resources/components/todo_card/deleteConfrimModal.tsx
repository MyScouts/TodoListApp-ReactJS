import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { clearTodoList, getTodoList, setTodoList } from '../../helpers/localStorgaeHelper';
import { TodoModel } from '../../models/todoItem';
import { useDispatch } from 'react-redux'
import { removeTodoAction } from '../../redux/actions/todoActions';

interface TodoDeleTeConfirmModal {
    show: boolean,
    handleClose: () => void,
    todo: TodoModel,
}




export default function TodoDeleTeConfirmModal(props: TodoDeleTeConfirmModal) {
    const dispatch = useDispatch()
    const handleDetele = () => {
        const todoList = getTodoList() as TodoModel[];
        const newTodoList = todoList.filter(todo => todo.todoId !== props.todo.todoId);
        clearTodoList();
        dispatch(removeTodoAction(newTodoList))
        setTodoList(JSON.stringify(newTodoList));
        props.handleClose();
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            keyboard={false}
            className='custom-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this todo?</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => handleDetele()}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}
