import axios, { AxiosResponse } from "axios";


const baseUrl: string = "http://localhost:5000/api/v1";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/todos"
        )
        return todos
    } catch (error: any) {
        return error.response
    }
}

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            title: formData.title,
            description: formData.description,
            status: false,
        };

        const addedTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/todos",
            { todo }
        )
        return addedTodo

    } catch (error: any) {
        return error.response
    }
}

export const deleteTodo = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            baseUrl + "/todos/" + _id
        )
        return deletedTodo
    } catch (error: any) {
        return error.response
    }
}

export const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: todo.status ? false : true,
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.patch(
            baseUrl + "/todos/" + todo._id,
            todoUpdate
        )
        return updatedTodo
    } catch (error: any) {
        return error.response
    }
}