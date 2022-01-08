import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { TodoModel, TODO_STATUS, TODO_TYPE } from '../../models/todoItem'
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { todoCreateSchema, todoEditSchema } from '../../hook/yup/todoSchema';
import './todoCard.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';
import { clearTodoList, getTodoList, setTodoList } from '../../helpers/localStorgaeHelper';
import { useDispatch } from 'react-redux'
import { editTodoAction } from '../../redux/actions/todoActions';


interface EditTodoModalProps {
    show: boolean,
    handleClose: () => void,
    todo: TodoModel,
}

interface IFormInput {
    taskTitle: string;
    taskContent: string;
    startDate: string | null;
    dueDate: string | null;
    todoType: TODO_TYPE;
    todoStatus: TODO_STATUS;
}



export const EditTodoModal = (props: EditTodoModalProps) => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(todoEditSchema)
    });
    const onSubmit: SubmitHandler<IFormInput> = data => {
        const { taskTitle, taskContent, startDate, dueDate, todoType, todoStatus } = data;
        const todoItem: TodoModel = {
            todoId: uuid(),
            name: taskTitle,
            content: taskContent,
            startDate,
            endDate: dueDate,
            category: todoStatus,
            type: todoType
        }
        let todoList = getTodoList() as TodoModel[];
        todoList = todoList.filter((todo) => todo.todoId !== props.todo.todoId)
        todoList.push(todoItem)
        dispatch(editTodoAction(todoList));
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
                            <input {...register("taskTitle", { value: props.todo.name })} id='taskTitle' className='input' />
                            {errors?.taskTitle && <p className='error-message {'>{errors.taskTitle.message}</p>}
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="taskDescription">Description</label>
                        <div className='input-group'>
                            <TextareaAutosize {...register("taskContent", { value: props.todo.content })} className='input' id='taskContent' />
                            {errors?.taskContent && <p className='error-message'>{errors.taskContent.message}</p>}
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="todoType">Type</label>
                        <div className='input-group'>
                            <select {...register("todoType")} className='input' id='todoType'>
                                {(Object.keys(TODO_TYPE) as Array<keyof typeof TODO_TYPE>).map((key, value) => <option key={key} value={key} {...props.todo.type === key && "selected"}>{key}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="todoStatus">Status</label>
                        <div className='input-group'>
                            <select {...register("todoStatus")} className='input' id='todoStatus'>
                                {(Object.keys(TODO_STATUS) as Array<keyof typeof TODO_STATUS>).map((key, value) => <option key={key} value={key} {...props.todo.category === key && "selected"}>{key}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="startDate">Start Date</label>
                        <div className='input-group'>
                            <input type={'date'}  {...register("startDate", { value: props.todo.startDate })} id='startDate' className='input' />
                            {errors?.startDate && <p className='error-message {'>{errors.startDate.message}</p>}
                        </div>
                    </div>

                    <div className='custom-input'>
                        <label htmlFor="dueDate">Due Date</label>
                        <div className='input-group'>
                            <input type={'date'}  {...register("dueDate", { value: props.todo.endDate })} id='dueDate' className='input' />
                            {errors?.dueDate && <p className='error-message'>{errors.dueDate.message}</p>}
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

