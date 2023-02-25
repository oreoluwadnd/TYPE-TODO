interface ITodo {
    _id: string
    title: string
    description: String
    status: Boolean
    createdAt?: Date
    updatedAt?: Date
}
interface TodoProps {
    todo: ITodo
}

type ApiDataType = {
    message: string
    status: string
    todos?: ITodo[]
    todo?: ITodo
  }