export class UpdateTodoDto {
    title?: string;
    state?: 'todo' | 'doing' | 'done';
}