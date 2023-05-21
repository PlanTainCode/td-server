import { Entity, ManyToOne,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

import { User } from 'src/user/entities/user.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn({ name: 'todo_id'})
    id: number;

    @Column()
    title: string;

    @Column()
    state: string;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({name: 'user_id'})
    user: User

    @CreateDateColumn()
    creatadAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
