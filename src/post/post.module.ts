import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/entities/user.entity";
import {Post} from "./entities/post.entity";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    SequelizeModule.forFeature([Post])
  ],

})
export class PostModule {}
