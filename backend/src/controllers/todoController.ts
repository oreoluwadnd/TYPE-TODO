import { Response,Request, NextFunction } from "express";
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
        const body = req.body as Pick<ITodo, "title" | "description" | "status">
        const todo: ITodo = new Todo({
            name: body.title,
            description: body.description,
            status: body.status
        })
        const newTodo: ITodo = await todo.save()
        res.json(201).json({
            status: "succuess",
            data : {
                newTodo       
            }
           
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data : {
               message: "Error Adding Todo"       
            }
           
        })
    
    }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {params:{id} , body} =req
      
        const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        res.json(201).json({
            status: "succuess",
            data : {
                updatedTodo       
            }
           
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data : {
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
        res.json(201).json({
            status: "succuess",
            data : {
                deletedTodo       
            }
           
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data : {
               message: "Error Updating Todo"       
            }
           
        })
    
    }
};

export { getTodos, addTodo, updateTodo, deleteTodo };