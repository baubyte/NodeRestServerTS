export class TodoEntity {

    public id: number;
    public title: string;
    public completed: boolean;
    public createdAt: Date;
    public updatedAt?: Date|null;

    /**
     * Constructs a new instance of the class with the given id, title, and completed status.
     *
     * @param {number} id - The id of the todo.
     * @param {string} title - The title of the todo.
     * @param {boolean} completed - The completed status of the todo.
     */
    private constructor(id: number, title: string, completed: boolean) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.createdAt = new Date();
        this.updatedAt = null;
    }
    /**
     * Returns a boolean indicating whether the todo is completed.
     *
     * @return {boolean} True if the todo is completed, false otherwise.
     */
    public get isCompleted(): boolean {
        return this.completed === true;
    }

    /**
     * Marks the task as completed and updates the completion status and timestamp.
     *
     * @return {void} No return value.
     */
    public markAsCompleted(): void {
        this.completed = true;
        this.updatedAt = new Date();
    }

    /**
     * Creates a new instance of TodoEntity from the provided object.
     *
     * @param {{[key: string]: any}} object - An object containing the properties of a TodoEntity.
     * @throws {string} Throws an error if the 'id' or 'title' property is missing from the object.
     * @return {TodoEntity} A new instance of TodoEntity with the provided properties.
     */
    public static fromObject(object: {[key: string]: any}): TodoEntity {
        const {id, title, completed, createdAt, updatedAt} = object;
        if (!id) {
            throw 'id is required';
        }
        if (!title) {
            throw 'title is required';
        }
        return new TodoEntity(id, title, completed);
    }
}