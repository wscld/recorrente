import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from 'src/auth/jwt.constants';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userServie: UserService, private jwtService: JwtService) { }

    async validate(usernameOrEmail: string, password: string) {
        const user = await this.userServie.find(usernameOrEmail);
        if (user && user.password === password) {
            user.password = null;
            return user;
        }
        return null;
    }

    private isTokenExpired(token: string) {
        try {
            this.jwtService.verify(token,
                { secret: JwtConstants.secret, ignoreExpiration: false });
        } catch (err) {
            return true;
        }
        return false;
    }

    async validateRefresh(token: string, refreshToken: string) {
        const payload = this.jwtService.decode(token) as any;
        const user = await this.userServie.findById(payload._id);
        if (user && refreshToken && this.isTokenExpired(token)) {
            const payload = { email: user.email, sub: user._id };
            if (user && refreshToken === user.refreshToken) {
                refreshToken = await this.userServie.updateRefreshToken(user._id);
                return {
                    access_token: this.jwtService.sign(payload),
                    refreshToken
                }
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new BadRequestException();
        }
    }

    async login(user: any) {
        const payload = { email: user.email, _id: user._id };
        let refreshToken = user.refreshToken;
        if (!refreshToken) {
            refreshToken = await this.userServie.updateRefreshToken(user._id);
        }
        return {
            access_token: this.jwtService.sign(payload),
            refreshToken
        }
    }

    async signUp(u: User) {
        const user = await this.userServie.create(u);
        const payload = { email: user.email, _id: user._id };
        let refreshToken = user.refreshToken;
        if (!refreshToken) {
            refreshToken = await this.userServie.updateRefreshToken(user._id);
        }
        return {
            access_token: this.jwtService.sign(payload),
            refreshToken
        }
    }
}
