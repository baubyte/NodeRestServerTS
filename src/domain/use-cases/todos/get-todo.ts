import { TodoEntity, TodoRepository } from "@domain/index";

export interface GetTodoUseCase {
    execute(id:number): Promise<TodoEntity>
}
export class GetTodo implements GetTodoUseCase {
    /**
     * Constructor for creating a new instance.
     *
     * @param {TodoRepository} todoRepository - the todo repository to be injected
     */
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}
    /**
     * Executes the function to get a todo entity by ID.
     *
     * @param {number} id - The ID of the todo entity to retrieve.
     * @return {Promise<TodoEntity>} The todo entity corresponding to the given ID.
     */
    execute(id: number): Promise<TodoEntity> {
        return this.todoRepository.findById(id);
    }
}