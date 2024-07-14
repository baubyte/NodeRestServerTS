import { Request, Response } from "express";
import { TodoRepository,CreateTodoDto, UpdateTodoDto  } from '@domain/index';

export class TodosController {

    constructor(
        private readonly TodoRepository: TodoRepository
    ) {
        
    }
    /**
     * Get todos from the server.
     *
     * @param {Request} request - the request object
     * @param {Response} response - the response object
     * @return {Promise<Response>} JSON response with todos
     */
    public getTodos = async (request:Request, response:Response): Promise<Response> => {
        const todos = await this.TodoRepository.findAll();
        return response.json(todos);
    };


    /**
     * Get todo by id from the server.
     *
     * @param {Request} request - the request object containing the id parameter
     * @param {Response} response - the response object
     * @return {Promise<Response>} JSON response with todo or error message
     */
    public getTodoById = async (request:Request, response:Response): Promise<Response> =>{
        const id = +request.params.id;
        if (isNaN(id)) {
            return response.status(404).json({
                message: 'ID is not a number'
            })
        }
        try {
            const todo = await this.TodoRepository.findById(id);
            return response.json(todo);
        } catch (error) {
            return response.status(400).json({
                message: `${error}`
            });
        }
    }


    /**
     * Create a new todo.
     *
     * @param {Request} request - the request object containing the title in the body
     * @param {Response} response - the response object
     * @return {Promise<Response>}  JSON response with the new todo or error message
     */
    public createTodo = async (request:Request, response:Response): Promise<Response> => {
        const [error, createTodoDto] = CreateTodoDto.create(request.body);
        if (error) {
            return response.status(400).json({
                message: error
            });
        }
        const todo = await this.TodoRepository.create(createTodoDto!);
        return response.status(201).json(todo);
    }

    /**
     * Update a todo.
     *
     * @param {Request} request - the request object containing 
     * the id in the params and title and completed in the body
     * @param {Response} response - the response object
     * @return {Promise<Response>} JSON response with the updated todo or error message
     */
    public updateTodo = async (request:Request, response:Response): Promise<Response> => {
        const id = +request.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({id,...request.body});
        if (error) {
            return response.status(400).json({
                message: error
            });
        }
        try {
            const updatedTodo = await this.TodoRepository.updateById(updateTodoDto!);
            return response.json(updatedTodo);
        } catch (error) {
            return response.status(400).json({
                message: `${error}`
            });
        }
    }

    /**
     * Delete a todo.
     *
     * @param {Request} request - the request object containing 
     * the id in the params
     * @param {Response} response - the response object
     * @return {Promise<Response>} JSON response with the deleted todo or error message
     */
    public deleteTodo = async (request:Request, response:Response): Promise<Response> => {
        const id = +request.params.id;
        if (isNaN(id)) {
            return response.status(404).json({
                message: 'ID is not a number'
            });
        }
        try {
            const deletedTodo = await this.TodoRepository.deleteById(id);
            return response.status(200).json(deletedTodo);
        } catch (error) {
            return response.status(400).json({
                message: `${error}`
            });
        }
    }
}