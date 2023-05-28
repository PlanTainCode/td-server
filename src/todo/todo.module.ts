import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule, 
    TypeOrmModule.forFeature([Todo, User])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
