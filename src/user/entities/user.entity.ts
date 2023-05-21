import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Todo } from "src/todo/entities/todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user, { onDelete: 'CASCADE'})
    todos: Todo[]

    @CreateDateColumn()
    creatadAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
