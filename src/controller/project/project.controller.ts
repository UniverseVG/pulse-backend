import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateProjectDto } from 'src/dto/create-project.dto';

import { ProjectService } from 'src/service/project/project.service';
import { UserProjectMappingService } from 'src/service/userProjectMapping/userProjectMapping.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userProjectMappingService: UserProjectMappingService,
  ) {}

  // post method for create task
  @Post()
  async createProject(
    @Res() response,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    try {
      const newProject = await this.projectService.createProject(
        createProjectDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Time log has been added successfully',
        newProject,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Time log not added!',
        error: 'Bad Request',
      });
    }
  }

  //update the task or time log

  //get all the tasks
  @Get()
  async getAllProjects(@Res() response, @Query('userId') userId: string) {
    try {
      const project = await this.userProjectMappingService.getAllMapping(
        userId,
      );
      const projectId = project.map((item: any) => item.projectId);

      const projectData = await this.projectService.getProjectByIds(projectId);

      return response.status(HttpStatus.OK).json({
        message: 'All Time logs are found successfully',
        projectData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
