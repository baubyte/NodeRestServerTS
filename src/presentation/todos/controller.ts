import { Request, Response } from "express";
import { TodoRepository,CreateTodoDto, UpdateTodoDto, GetTodos, GetTodo, CreateTodo, UpdateTodo, DeleteTodo  } from '@domain/index';

export class TodosController {

    /**
     * Constructor for the TodosController class.
     *
     * @param {TodoRepository} TodoRepository - The TodoRepository instance to be injected.
     */
    constructor(
        private readonly TodoRepository: TodoRepository
    ) {
        
    }
    /**
     * Get todos from the server.
     *
     * @param {Request} request - the request object
     * @param {Response} response - the response object
     */
    public getTodos = async (request:Request, response:Response) => {
        return new GetTodos(this.TodoRepository)
        .execute()
        .then(todos => response.json(todos))
        .catch(error => response.status(400).json({message: error}));
    };


    /**
     * Get todo by id from the server.
     *
     * @param {Request} request - the request object containing the id parameter
     * @param {Response} response - the response object
     */
    public getTodoById = async (request:Request, response:Response)=>{
        const id = +request.params.id;
        return new GetTodo(this.TodoRepository)
        .execute(id)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({message: error}));
    }


    /**
     * Create a new todo.
     *
     * @param {Request} request - the request object containing the title in the body
     * @param {Response} response - the response object
     */
    public createTodo = (request:Request, response:Response)=> {
        const [error, createTodoDto] = CreateTodoDto.create(request.body);
        if (error) {
            return response.status(400).json({
                message: error
            });
        }
        return new CreateTodo(this.TodoRepository)
        .execute(createTodoDto!)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({message: error}));
    }

    /**
     * Update a todo.
     *
     * @param {Request} request - the request object containing 
     * the id in the params and title and completed in the body
     * @param {Response} response - the response object
     * @return {Response} JSON response with the updated todo or error message
     */
    public updateTodo = (request:Request, response:Response) => {
        const id = +request.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({id,...request.body});
        if (error) {
            return response.status(400).json({
                message: error
            });
        }
        return new UpdateTodo(this.TodoRepository)
        .execute(updateTodoDto!)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({message: error}));
    }

    /**
     * Delete a todo.
     *
     * @param {Request} request - the request object containing 
     * the id in the params
     */
    public deleteTodo =  (request:Request, response:Response) => {
        const id = +request.params.id;
        if (isNaN(id)) {
            return response.status(404).json({
                message: 'ID is not a number'
            });
        }
        return new DeleteTodo(this.TodoRepository)
        .execute(id)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({message: error}));
    }
}