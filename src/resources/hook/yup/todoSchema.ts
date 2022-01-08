import * as yup from "yup";

export const todoCreateSchema = yup.object({
    taskTitle: yup.string().required("Task title is required"),
    taskContent: yup.string().required("Task content is required"),
    startDate: yup.string().nullable(),
    dueDate: yup.string().nullable()
});


export const todoEditSchema = yup.object({
    taskTitle: yup.string().required("Task title is required"),
    taskContent: yup.string().required("Task content is required"),
    taskType: yup.string().required("Task content is required"),
    taskStatus: yup.string().required("Task content is required"),
    startDate: yup.string().nullable(),
    dueDate: yup.string().nullable()
});
