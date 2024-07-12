export class UpdateTodoDto {
    public readonly id: number;
    public readonly title?: string;
    public readonly completed?: boolean;
    public readonly updatedAt: Date;
    /**
     * Constructs a new instance of the class with the given title.
    *
     * @param {number} id - The id of the todo.
     * @param {string} title - The title of the todo.
     * @param {boolean} completed - Whether the todo is completed or not.
     */
    private constructor(
        id: number,
        title?: string, 
        completed?: boolean,
    ) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.updatedAt = new Date();
    }
    /**
     * Returns an object containing the properties of the current instance that have
     * been set. If the `title` property is set, it is added to the object with the key
     * "title". If the `completed` property is set, it is added to the object with the
     * key "completed".
     *
     * @return {Object} An object containing the properties of the current instance
     * that have been set.
     */
    public get values (): {[key:string]:any} {
        const returnObject: {[key:string]:any} = {};
        if (this.title) {
            returnObject.title = this.title;
        }
        if (this.completed) {
            returnObject.completed = this.completed;
        }
        returnObject.updatedAt = this.updatedAt;
        return returnObject;
    }
    /**
     * Create a new Todo item based on the provided properties.
     *
     * @param {Object} props - An object containing properties for the Todo item.
     * @return {[string?, CreateTodoDto?]} An array where the first element 
     * is an error message (if any) and the second element is a CreateTodoDto object.
     */
    public static create(props:{[key:string]:any}): [string?,UpdateTodoDto?] {
        const {title, completed, id} = props;
        if (id === undefined) {
            return ['Id is required', undefined];
        }
        if (isNaN(Number(id))) {
            return ['Id must be a number', undefined];
        }
        if (id < 0) {
            return ['Id must be a positive number', undefined];
        }
        if (typeof title !== 'string') {
            return ['Title must be a string', undefined];
        }
        if (typeof completed !== 'boolean') {
            return ['Completed must be a boolean', undefined];
        }
        const titleCapitalized = `${title.trim().charAt(0).toUpperCase()} ${title.trim().slice(1)}`;
        return [undefined,new UpdateTodoDto(id,titleCapitalized, completed)];
    }
}