import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTodosForUser(userId: number) {
    return await this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async createTodoForUser(userId: number, createTodoDto: CreateTodoDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    const newTodo = this.todoRepository.create({ ...createTodoDto, user, state: 'todo' });
    return await this.todoRepository.save(newTodo);
  }

  async deleteTodoForUser(userId: number, todoId: number) {
    const todo = await this.todoRepository.findOne({ where: { id: todoId, user: { id: userId } } });
    if (!todo) throw new NotFoundException('Todo not found');
    return await this.todoRepository.remove(todo);
  }

  async updateTodoForUser(userId: number, todoId: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id: todoId, user: { id: userId } } });
    if (!todo) throw new NotFoundException('Todo not found');
    const updatedTodo = this.todoRepository.merge(todo, updateTodoDto);
    return await this.todoRepository.save(updatedTodo);
  }
}