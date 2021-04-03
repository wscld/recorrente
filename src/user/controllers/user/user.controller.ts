import { Body } from '@nestjs/common';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('login')
    login(@Body() body) {
        return this.userService.validate(body.usernameOrEmail, body.password);
    }
}
