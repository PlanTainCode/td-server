import { Controller, Get, Post, Delete, Patch, UseGuards, Request, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodos(@Request() req) {
    return await this.todoService.getTodosForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodoForUser(req.user.id, createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTodo(@Request() req, @Param('id') id: number) {
    return await this.todoService.deleteTodoForUser(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTodo(@Request() req, @Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.updateTodoForUser(req.user.id, id, updateTodoDto);
  }
}
