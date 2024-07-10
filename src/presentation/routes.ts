import { Router } from "express";
import { TodoRoutes } from "@presentation/todos/routes";

export class AppRoutes {
    
    /**
     * Returns a Router instance with the '/api/todos' route mounted to it.
     *
     * @return {Router} The Router instance with the '/api/todos' route mounted.
     */
    static get routes():Router {
        const router = Router();
        router.use('/api/todos', TodoRoutes.routes);
        return router;
    }
}