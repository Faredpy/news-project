import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Comment} from "../../comment/entities/comment.entity";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs {
    firstName: string,
    email: string,
    password: string,
    isActive: boolean
}


@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Alex', description: 'Имя пользователя'})
    @Column({
        type: DataType.STRING,
    })
    firstName: string;

    @ApiProperty({example: 'alex@alex', description: 'Почта пользователя'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({example: 'true', description: 'Активность'})
    @Column({ defaultValue: true })
    isActive: boolean;

    @HasMany(() => Comment)
    comments: Comment[]
}