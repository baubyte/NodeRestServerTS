import { TodoEntity, TodoRepository } from "@domain/index";

export interface DeleteTodoUseCase {
    execute(id:number): Promise<TodoEntity>
}
export class DeleteTodo implements DeleteTodoUseCase {

    /**
     * Creates a new instance of the class.
     *
     * @param {TodoRepository} todoRepository - The repository used to interact with the Todo model.
     */
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}
    /**
     * Executes the function to delete a todo entity by ID.
     *
     * @param {number} id - The ID of the todo entity to delete.
     * @return {Promise<TodoEntity>} The deleted todo entity.
     */
    execute(id: number): Promise<TodoEntity> {
        return this.todoRepository.deleteById(id);
    }
}