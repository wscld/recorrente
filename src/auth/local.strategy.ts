import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./services/auth/auth.service";

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy, 'local') {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'usernameOrEmail',
            passwordField: 'password'
        })
    }

    async validate(usernameOrEmail: string, password: string) {
        const user = await this.authService.validate(usernameOrEmail, password);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }
}