import { TodoEntity, TodoRepository } from "@domain/index";

export interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}
export class GetTodos implements GetTodosUseCase {
    /**
     * Constructor for creating a new instance.
     *
     * @param {TodoRepository} todoRepository - the todo repository to be injected
     */
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}
    /**
     * Executes the function and returns a promise with an array of TodoEntity objects.
     *
     * @return {Promise<TodoEntity[]>} Promise with an array of TodoEntity objects
     */
    execute(): Promise<TodoEntity[]> {
        return this.todoRepository.findAll();
    }
}