import { Body, Delete, Get, Put } from '@nestjs/common';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from 'src/product/services/product/product.service';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private productService: ProductService) { }
    @UseGuards(JwtAuthGuard)
    @Get('products')
    getUserProducts(@Request() req) {
        return this.userService.findUserProducts(req.user._id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('companies')
    getUserCompanies(@Request() req) {
        return this.userService.findUserCompanies(req.user._id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('product')
    updateProduct(@Request() req, @Body() body) {
        return this.productService.update(body, req.user._id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('product')
    createProduct(@Request() req, @Body() body) {
        return this.userService.addUserProduct(req.user._id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('product')
    deleteProduct(@Request() req, @Body() body) {
        return this.userService.removeUserProduct(req.user._id, body);
    }
}

