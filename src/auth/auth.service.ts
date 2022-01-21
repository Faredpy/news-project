import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({where: {email, password}});
    if (user && user.password === password) {
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
    const user = await this.usersService.create(dto);
    return this.generateJwtToken({id: user.id, email: user.email})

  }
}
