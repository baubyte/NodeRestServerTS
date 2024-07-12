export class CreateTodoDto {

    public readonly title: string;
    /**
     * Constructs a new instance of the class with the given title.
     *
     * @param {string} title - The title of the todo.
     */
    private constructor(title: string) {
        this.title = title;
    }

    /**
     * Create a new Todo item based on the provided properties.
     *
     * @param {Object} props - An object containing properties for the Todo item.
     * @return {[string?, CreateTodoDto?]} An array where the first element 
     * is an error message (if any) and the second element is a CreateTodoDto object.
     */
    public static create(props:{[key:string]:any}): [string?,CreateTodoDto?] {
        const {title} = props;
        if (!title) {
            return ['Title is required', undefined];
        }
        if (typeof title !== 'string') {
            return ['Title must be a string', undefined];
        }
        if (title.trim().length < 3) {
            return ['Title must be at least 3 characters', undefined];
        }
        if (title.trim().length > 100) {
            return ['Title must be at most 100 characters', undefined];
        }
        const titleCapitalized = `${title.trim().charAt(0).toUpperCase()} ${title.trim().slice(1)}`;
        return [undefined,new CreateTodoDto(titleCapitalized)];
    }
}