import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // post method for create task
  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const getUser = await this.userService.getUser();
      const isUserExist = getUser.find(
        (item) => item.email === createUserDto.email,
      );

      if (!isUserExist) {
        await this.userService.createUser(createUserDto);
        return response.status(HttpStatus.CREATED).json({
          message: 'User has been added successfully',
        });
      } else {
        return response.status(HttpStatus.CREATED).json({
          message: 'User already exist',
        });
      }
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error adding user to Cognito User Pool',
        error: 'Bad Request',
      });
    }
  }

  //get task or time log by id
  @Get()
  async getUser(@Res() response) {
    try {
      const users = await this.userService.getUser();
      return response.status(HttpStatus.OK).json({
        message: 'User has been found successfully',
        users,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
