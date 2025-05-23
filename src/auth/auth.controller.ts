import { Body, Controller, Get, Post, Request, UseGuards, HttpCode} from '@nestjs/common';
import { SignInDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    
    @Post('signin')
    @HttpCode(200)
    async signin(@Body() body: SignInDTO){
        return this.authService.signin(body);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me (@Request() request) {
        return request.user;
    }
}
