import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Comment} from "../../comment/entities/comment.entity";


interface PostCreationAttrs {
    title: string,
    body: string,
    tags: string,
}

@Table({tableName: 'Posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
    })
    body: string;

    @Column({
        type: DataType.TEXT,
    })
    tags: string;

    @HasMany(() => Comment)
    comments: Comment[]

}