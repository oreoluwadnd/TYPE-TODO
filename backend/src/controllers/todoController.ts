import { Response, Request, NextFunction } from "express";
import { ITodo } from "../types/todo";
import Todo from "../models/todoModel";


const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({ todos });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {

        const body = req.body.todo as Pick<ITodo, "title" | "description" | "status">
        const todo: ITodo = new Todo({
            title: body.title,
            description: body.description,
            status: body.status
        })

        const newTodo: ITodo = await Todo.create(todo)


        res.status(201).json({
            status: "succuess",
            newtodo: newTodo

        })
    } catch (error: any) {
        res.status(404).json({
            status: "failed",
            data: {
                error: error.message
            }

        })

    }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { params: { id }, body } = req
        const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            });
        res.status(201).json({
            status: "succuess",
            updatedTodo

        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: {
                message: "Error Updating Todo"
            }

        })

    }
};
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id

        const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
            id
        )
        res.status(201).json({
            status: "succuess",
            deletedTodo

        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: {
                message: "Error Updating Todo"
            }

        })

    }
};

export { getTodos, addTodo, updateTodo, deleteTodo };