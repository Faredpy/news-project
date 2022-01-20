import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface UserCreationAttrs {
    firstName: string,
    email: string,
    password: string,
    isActive: boolean
}


@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.STRING,
    })
    firstName: string;

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

    @Column({ defaultValue: true })
    isActive: boolean;
}