import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "test"
        })
    }

    async validate(payload: { sub: number, email: string }) {

        const user = await this.userService.findById(payload.sub)

        if (!user) {
            throw new UnauthorizedException("Нет доступа")
        }

        return {
            id: payload.sub,
            email: payload.email,
        }
    }
}