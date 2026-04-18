import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { VerifyOtpDto, CreateUserDto, UpdateUserDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** POST /otp/verify */
  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.userService.verifyOtp(dto.mobile, dto.otp);
  }

  /** POST /users – create new user + trigger matching */
  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  /** GET /users?hospitalId=xxx */
  @Get('users')
  getUsers(@Query('hospitalId') hospitalId?: string) {
    return this.userService.getUsers(hospitalId);
  }

  /** GET /users/:id */
  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  /** PATCH /users/:id */
  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }
}
