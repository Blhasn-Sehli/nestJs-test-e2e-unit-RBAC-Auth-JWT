import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * AuthController is responsible for handling authentication-related requests.
 *
 * @remarks
 * This controller provides endpoints for user registration and login.
 *
 * @see CreateUserDto
 * @see AuthService
 */
@ApiTags('Authentification de l\'utilisateur')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Creates a new user.
   *
   * @param signUpDto - The data for creating a new user.
   * @returns The result of the signUp method.
   */
  @Post('register')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  /**
   * Signs in a user.
   *
   * @param signInDto - The data for signing in a user.
   * @returns The result of the signIn method.
   */
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const { name, password } = signInDto;
    return this.authService.signIn(name, password);
  }
}
