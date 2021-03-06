import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

  create(dto: CreateCommentDto) {
    const comment = this.commentRepository.create({text: dto.text, postId: dto.postId, userId: 1})
    return comment
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
