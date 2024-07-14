import { CreateTodoDto, UpdateTodoDto} from '@dtos/todos';
import { TodoEntity } from '@entities/todo.entity';
export abstract class TodoDatasource {
    public abstract create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity>
    public abstract findAll(): Promise<TodoEntity[]>
    public abstract findById(id: number): Promise<TodoEntity>
    public abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    public abstract deleteById(id: number): Promise<TodoEntity>
}