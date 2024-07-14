import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "@domain/index";
import { prisma } from "@src/data/postgres";

export class TodoDataSourceImpl  implements TodoDatasource{
    /**
     * Creates a new TodoEntity using the provided CreateTodoDto.
     *
     * @param {CreateTodoDto} createTodoDto - The data for creating the TodoEntity.
     * @return {Promise<TodoEntity>} A Promise that resolves to the created TodoEntity.
     */
    public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }
    /**
     * Retrieve all Todo entities from the database.
     *
     * @return {Promise<TodoEntity[]>} an array of TodoEntity objects
     */
    public async findAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
       return todos.map(todo => TodoEntity.fromObject(todo));
    }
    /**
     * Find a TodoEntity by its id.
     *
     * @param {number} id - The id of the TodoEntity to find.
     * @return {Promise<TodoEntity>} The found TodoEntity.
     */
    public async findById(id: number): Promise<TodoEntity> {
        try {
            const todo = await prisma.todo.findFirstOrThrow({where: {id}});
            return TodoEntity.fromObject(todo);
        } catch (error) {
            throw `Todo not found with id: ${id}`;
        }
    }
    /**
     * Updates a todo entity by its ID using the provided UpdateTodoDto.
     *
     * @param {UpdateTodoDto} updateTodoDto - The DTO containing the ID and values to update the todo with.
     * @return {Promise<TodoEntity>} - A promise that resolves to the updated todo entity.
     * @throws {string} - If the todo is not found with the provided ID.
     */
    public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
       try {
            const todo = await this.findById(updateTodoDto.id);
            const updatedTodo = await prisma.todo.update({
                where: {id: updateTodoDto.id},
                data: updateTodoDto.values
            });
            return TodoEntity.fromObject(updatedTodo);
       } catch (error) {
            throw `Todo not found with id: ${updateTodoDto.id}`;
       }
    }
    /**
     * Deletes a todo entity by its ID.
     *
     * @param {number} id - The ID of the todo entity to be deleted.
     * @return {Promise<TodoEntity>} A promise that resolves to the deleted todo entity.
     * @throws {string} Throws an error if the todo with the given ID is not found.
     */
    public async deleteById(id: number): Promise<TodoEntity> {
        try {
            const todo = await this.findById(id);
            const deletedTodo = await prisma.todo.delete({where: {id}});
            return TodoEntity.fromObject(deletedTodo);
       } catch (error) {
            throw `Todo not found with id: ${id}`;
       }
    }
}