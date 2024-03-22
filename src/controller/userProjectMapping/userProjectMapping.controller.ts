import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateUserProjectMappingDto } from 'src/dto/create-userProjectMapping.dto';
import { UserProjectMappingService } from 'src/service/userProjectMapping/userProjectMapping.service';

@Controller('projectMapping')
export class UserProjectMappingController {
  constructor(
    private readonly userProjectMappingService: UserProjectMappingService,
  ) {}

  // post method for create task
  @Post()
  async createMapping(
    @Res() response,
    @Body() createUserProjectMappingDto: CreateUserProjectMappingDto,
  ) {
    try {
      const newMapping = await this.userProjectMappingService.createMapping(
        createUserProjectMappingDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Time log has been added successfully',
        newMapping,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Time log not added!',
        error: 'Bad Request',
      });
    }
  }

  //get all the tasks
  @Get()
  async getAllMapping(
    @Res() response,
    // @Query('projectId') projectId: string,
    @Query('userId') userId: string,
  ) {
    try {
      const getMapping = await this.userProjectMappingService.getAllMapping(
        userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'All Time logs are found successfully',
        getMapping,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
