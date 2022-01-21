import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({where: {email}});
    console.log(user)
    const hashDecoded = await bcrypt.compare(password, user.password)
    console.log(hashDecoded)
    if (user && hashDecoded) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.usersService.findByCond({where: {email, password}});
  //   if (user && user.password === password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  generateJwtToken(data: { id: number, email: string }) {
    const payload = { email: data.email, sub: data.id };
    return {token: this.jwtService.sign(payload)}
  }

  async login(user: User) {
    console.log(user)
    // const { password, ...userData} = user; +временно добавим юзера
    // const payload = { email: user.email, sub: user.id };
    // return {
    //   // ...userData,
    //   access_token: this.jwtService.sign(payload),
    // };
    return this.generateJwtToken({id: user.id, email: user.email})
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.usersService.findByCond({where: { email: dto.email}})
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 5)
    console.log(hashPassword)
    const user = await this.usersService.create({...dto, password: hashPassword});
    return this.generateJwtToken({id: user.id, email: user.email})

  }
}
