import {Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {User} from "./entities/user.entity";
import {InjectModel} from "@nestjs/sequelize";
import {FindOptions} from "sequelize/dist/lib/model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  findById(id: number) {
    return this.userRepository.findOne({where: {id}})
  }

  findByCond(cond: FindOptions<User>) {
    //console.log(cond) //{ where: { email: 'mail@mail', password: '111' }}
    const newCond = {...cond, ...{raw: true}}
    return this.userRepository.findOne(newCond)
  }

  // findByCond(cond: LoginUserDto) {
  //   return this.userRepository.findOne({where: cond})
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
