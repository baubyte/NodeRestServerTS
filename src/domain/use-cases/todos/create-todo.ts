import { CreateTodoDto, TodoEntity, TodoRepository } from "@domain/index";

export interface CreateTodoUseCase {
    execute(dto: CreateTodoDto): Promise<TodoEntity>
}
export class CreateTodo implements CreateTodoUseCase {
    /**
     * Constructor for creating a new instance.
     *
     * @param {TodoRepository} todoRepository - the todo repository to be injected
     */
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}
    /**
     * Executes the creation of a new TodoEntity using the provided CreateTodoDto.
     *
     * @param {CreateTodoDto} dto - The data transfer object containing the necessary information to create a new TodoEntity.
     * @return {Promise<TodoEntity>} A Promise that resolves to the newly created TodoEntity.
     */
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.create(dto);
    }
    
}