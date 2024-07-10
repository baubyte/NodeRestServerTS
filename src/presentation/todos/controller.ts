import { Request, Response } from "express";

const todos  = [
    {
        id: 1,
        title: 'Todo 1',
        completed: false,
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    {
        id: 2,
        title: 'Todo 2',
        completed: true,
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    {
        id: 3,
        title: 'Todo 3',
        completed: false,
        createdAt : new Date(),
        updatedAt : new Date(),
    }
];
export class TodosController {

    /**
     * Get todos from the server.
     *
     * @param {Request} request - the request object
     * @param {Response} response - the response object
     * @return {Response} JSON response with todos
     */
    public getTodos = (request:Request, response:Response): Response => response.json(todos);


    /**
     * Get todo by id from the server.
     *
     * @param {Request} request - the request object containing the id parameter
     * @param {Response} response - the response object
     * @return {Response} JSON response with todo or error message
     */
    public getTodoById = (request:Request, response:Response): Response =>{
        const id = +request.params.id;
        const todo = todos.find((todo) => todo.id === id);
        if (isNaN(id)) {
            return response.status(404).json({
                message: 'ID is not a number'
            })
        }
        return (todo)
            ? response.json(todo)
            : response.status(404).json({
                message: `Todo not found with id: ${id}`
            });
    }


    /**
     * Create a new todo.
     *
     * @param {Request} request - the request object containing the title in the body
     * @param {Response} response - the response object
     * @return {Response} JSON response with the new todo or error message
     */
    public createTodo = (request:Request, response:Response): Response => {
        const {title} = request.body;
        if (!title) {
            return response.status(400).json({
                message: 'Title is required'
            });
        }

        const todo = {
            id: todos.length + 1,
            title,
            completed: false,
            createdAt : new Date(),
            updatedAt : new Date(),
        };
        todos.push(todo);
        return response.status(201).json(todo);
    }

    /**
     * Update a todo.
     *
     * @param {Request} request - the request object containing 
     * the id in the params and title and completed in the body
     * @param {Response} response - the response object
     * @return {Response} JSON response with the updated todo or error message
     */
    public updateTodo = (request:Request, response:Response): Response => {
        const id = +request.params.id;
        if (isNaN(id)) {
            return response.status(404).json({
                message: 'ID is not a number'
            });
        }
        const {title, completed} = request.body;
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
            return response.status(404).json({
                message: `Todo not found with id: ${id}`
            });
        }
        todo.title = title || todo.title;
        todo.completed = completed ||todo.completed;
        todo.updatedAt = new Date();
        todos.forEach((todo, index) => {
            if (todo.id === id) {
                todos[index] = todo;
            }
        })
        return response.json(todo);
    }

    /**
     * Delete a todo.
     *
     * @param {Request} request - the request object containing 
     * the id in the params
     * @param {Response} response - the response object
     * @return {Response} JSON response with no content and status 204
     */
    public deleteTodo = (request:Request, response:Response): Response => {
        const id = +request.params.id;
        if (isNaN(id)) {
            return response.status(404).json({
                message: 'ID is not a number'
            });
        }
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
            return response.status(404).json({
                message: `Todo not found with id: ${id}`
            });
        }
        todos.forEach((todo, index) => {
            if (todo.id === id) {
                todos.splice(index, 1);
            }
        })
        return response.status(200).json(todo);
    }
}