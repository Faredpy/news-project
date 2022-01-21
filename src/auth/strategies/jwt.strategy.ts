import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //если просрочен не пропустит
            secretOrKey: 'test',
        });
    }

    async validate(payload: {sub: number, email: string}) {
        const user = await this.userService.findByCond({where: { id: payload.sub, email: payload.email}})
        if(!user){
            throw new UnauthorizedException('Нет доступа к данной странице')
        }

        return { id: payload.sub, email: payload.email };
    }
}