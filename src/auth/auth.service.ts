import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

/**
 * The AuthService class handles user authentication and authorization.
 * It provides methods for user sign up and sign in, as well as generating JWT tokens.
 * 
 * @class
 * @public
 * @module AuthService
 */

@Injectable()
export class AuthService {
    // This is a placeholder for now
    // We will add methods to this class in the next few steps
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    
    // Create a new user and return the user object after saving it to the database and hashing the password
    async signUp(user: CreateUserDto) {
        // Check if the user already exists
        const existingUser = await this.userService.findOne(user.name);
        // If the user exists, throw a bad request exception
        if (existingUser) {
            throw new UnauthorizedException("User already exists!");
        }
        // If the user does not exist, hash the password and create a new user
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // Create a new user to hash the password
        const newUser = { ...user, password: hashedPassword };
        // Return the newly created user
        return await this.userService.create(newUser);
    }

    // Sign in a user and return a JWT token
    async signIn(name: string, pass: string): Promise<{ access_token: string }> {
        // Find the user by name
        const user: any = await this.userService.findOne(name);
        // If the user is not found, throw a bad request exception
        if (!user) {
            throw new BadRequestException("User not found!");
        }
        // Compare the entered password with the hashed password
        const isMatch: boolean = bcrypt.compareSync(pass, user.password);
        if (!isMatch) {
            // If the password is incorrect, throw an unauthorized exception
            throw new UnauthorizedException("Invalid credentials!");
        }
        // If the password is correct, create a JWT token
        const payload = { name: user.name, sub: user._id, role: user.role };
        // Return the token
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }



}
