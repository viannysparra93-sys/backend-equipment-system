import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para iniciar sesión
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
