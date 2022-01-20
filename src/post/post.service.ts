import {Injectable, NotFoundException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./entities/post.entity";

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(dto: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.create(dto)
    return post
  }

  async findAll() {
    const findAll = await this.postRepository.findAll();
    if (!findAll.length) {
      throw new NotFoundException('Нет статей');
    }
    return findAll;
  }

  async findOne(id: number) {
    const find = await this.postRepository.findOne({where: {id}});
    if (!find) {
      throw new NotFoundException('Статья не найдена');
    }
    return find;
  }

  async update(id: number, dto: UpdatePostDto) {
    const update = await this.postRepository.update(dto, {where: {id}})
    if (!update[0]){
      throw new NotFoundException('Нечего обновлять')
    }
    const find = await this.postRepository.findOne({where: {id}})
    return find ;
  }

  async remove(id: number) {
    const destroy = await this.postRepository.destroy({where: {id}})
    if (!destroy){
      throw new NotFoundException('Нечего удалять')
    }
    return destroy;
  }
}
