import { Body, Get } from '@nestjs/common';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @UseGuards(JwtAuthGuard)
    @Get('products')
    getUserProducts() {
        return '';
    }
    @UseGuards(JwtAuthGuard)
    @Get('companies')
    getUserCompanies() {
        return '';
    }
}

