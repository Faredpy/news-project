import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {config} from 'dotenv'
import {User} from "./user/entities/user.entity";
import { PostModule } from './post/post.module';
import {Post} from "./post/entities/post.entity";
import { CommentModule } from './comment/comment.module';
import {Comment} from "./comment/entities/comment.entity";
import { AuthModule } from './auth/auth.module';
config()


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Post, Comment]
    }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
