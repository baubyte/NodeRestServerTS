import { Router } from "express";
import { TodosController } from "@presentation/todos/controller";

export class TodoRoutes {
    
    /**
     * Returns a Router instance with the following routes configured:
     * - GET / : Calls the getTodos method of the TodosController.
     * - GET /{id} : Calls the getTodoById method of the TodosController.
     * - POST / : Calls the createTodo method of the TodosController.
     * - PUT /{id} : Calls the updateTodo method of the TodosController.
     * - DELETE /{id} : Calls the deleteTodo method of the TodosController.
     *
     * @return {Router} The Router instance with the configured routes.
     */
    static get routes():Router {
        const router = Router();
        const todoController = new TodosController();
        router.get('/',todoController.getTodos);
        router.get('/:id',todoController.getTodoById);
        router.post('/',todoController.createTodo);
        router.put('/:id',todoController.updateTodo);
        router.delete('/:id',todoController.deleteTodo);
        return router;
    }
}