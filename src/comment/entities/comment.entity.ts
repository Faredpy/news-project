import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from "../../user/entities/user.entity";
import {Post} from "../../post/entities/post.entity";

interface CommentCreationAttrs {
    text: string,
    postId: number,
    userId: number,
}

@Table({tableName: 'Comments'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @Column({
        type: DataType.TEXT,
    })
    text: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER
    })
    postId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Post)
    post: Post
}