import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "@domain/index";

export class TodoRepositoryImpl implements TodoRepository {

    /**
     * A description of the entire function.
     *
     * @param {type} datasource - description of parameter
     * @return {type} 
     */
    constructor(
        private readonly datasource: TodoDatasource
    ) {}
    
    /**
     * Creates a new TodoEntity in the datasource.
     *
     * @param {CreateTodoDto} createTodoDto - The data to create the TodoEntity.
     * @return {Promise<TodoEntity>} A Promise that resolves to the created TodoEntity.
     */
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    /**
     * Find all todo entities.
     *
     * @return {Promise<TodoEntity[]>} Array of TodoEntity objects
     */
    findAll(): Promise<TodoEntity[]> {
        return this.datasource.findAll();
    }
    /**
     * A method to find a TodoEntity by its id.
     *
     * @param {number} id - the id of the TodoEntity to find
     * @return {Promise<TodoEntity>} the TodoEntity found by the id
     */
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    /**
     * Updates a todo by its id.
     *
     * @param {UpdateTodoDto} updateTodoDto - the DTO containing the updated todo information
     * @return {Promise<TodoEntity>} the updated todo entity
     */
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto);
    }
    /**
     * Deletes a TodoEntity by its ID.
     *
     * @param {number} id - The ID of the TodoEntity to delete.
     * @return {Promise<TodoEntity>} A Promise that resolves to the deleted TodoEntity.
     */
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }
}