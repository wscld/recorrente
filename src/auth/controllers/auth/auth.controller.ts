import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post('refreshtoken')
    async refreshToken(@Request() req, @Body() body: any) {
        const token = req.headers.authorization.replace('Bearer ','');
        return this.authService.validateRefresh(token, body.refreshToken);
    }
}
