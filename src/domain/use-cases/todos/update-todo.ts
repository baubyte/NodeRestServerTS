import { TodoEntity, TodoRepository, UpdateTodoDto } from "@domain/index";

export interface UpdateTodoUseCase {
    execute(dto: UpdateTodoDto): Promise<TodoEntity>
}
export class UpdateTodo implements UpdateTodoUseCase {

    /**
     * Constructor for creating a new instance.
     *
     * @param {TodoRepository} todoRepository - the todo repository to be injected
     */
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    /**
     * Executes the update of a TodoEntity using the provided UpdateTodoDto.
     *
     * @param {UpdateTodoDto} dto - The data transfer object containing the necessary information to update a TodoEntity.
     * @return {Promise<TodoEntity>} A Promise that resolves to the updated TodoEntity.
     */
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.updateById(dto);
    }
}