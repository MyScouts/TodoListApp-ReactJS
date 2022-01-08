import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { TodoModel, TODO_STATUS, TODO_TYPE } from '../../models/todoItem'
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { todoCreateSchema } from '../../hook/yup/todoSchema';
import './todoColumn.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { addTodoAction } from '../../redux/actions/todoActions';

interface TodoColumnCreateModalProps {
    show: boolean,
    handleClose: () => void,
}

interface IFormInput {
    taskTitle: string;
    taskContent: string;
    startDate: string | null;
    dueDate: string | null;
    todoType: TODO_TYPE;
}


export default function TodoColumnCreateModal(props: TodoColumnCreateModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(todoCreateSchema)
    });
    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<IFormInput> = data => {
        const { taskTitle, taskContent, startDate, dueDate, todoType } = data;
        const todoItem: TodoModel = {
            todoId: uuid(),
            name: taskTitle,
            content: taskContent,
            startDate,
            endDate: dueDate,
            category: TODO_STATUS.OPEN,
            type: todoType
        }
        dispatch(addTodoAction(todoItem))
        props.handleClose();
    };

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            className='custom-modal'
        >
            <form onSubmit={handleSubmit(onSubmit)}  >
                <Modal.Header closeButton>
                    <Modal.Title>New To do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='custom-input'>
                        <label htmlFor="taskTitle">Title</label>
                        <div className='input-group'>
                            <input {...register("taskTitle", { required: true, maxLength: 20 })} id='taskTitle' className='input' />
                            {errors?.taskTitle && <p className='error-message {'>{errors.taskTitle.message}</p>}
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="taskDescription">Description</label>
                        <div className='input-group'>
                            <TextareaAutosize {...register("taskContent")} className='input' id='taskContent' />
                            {errors?.taskContent && <p className='error-message {'>{errors.taskContent.message}</p>}
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="todoType">Type</label>
                        <div className='input-group'>
                            <select {...register("todoType")} className='input' id='todoType'>
                                {(Object.keys(TODO_TYPE) as Array<keyof typeof TODO_TYPE>).map((key, value) => <option key={key} value={key} >{key}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="startDate">Start Date</label>
                        <div className='input-group'>
                            <input type={'date'} {...register("startDate")} id='startDate' className='input' />
                            {errors?.startDate && <p className='error-message {'>{errors.startDate.message}</p>}
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="dueDate">Start Date</label>
                        <div className='input-group'>
                            <input type={'date'}  {...register("dueDate")} id='dueDate' className='input' />
                            {errors?.dueDate && <p className='error-message {'>{errors.dueDate.message}</p>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' >Save</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
