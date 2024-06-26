import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskService } from 'src/service/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // post method for create task
  @Post()
  async createTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.taskService.createTask(createTaskDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Time log has been added successfully',
        newTask,
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

  @Put('/bulk-update')
  async updateTasks(
    @Res() response,
    @Body()
    bulkUpdateData: { taskIds: string[]; updateTask: UpdateTaskDto[] },
  ) {
    try {
      const { taskIds, updateTask } = bulkUpdateData;

      const updatedTasks = await this.taskService.updateTasks(
        taskIds,
        updateTask,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Tasks have been successfully updated',
        updatedTasks,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //get all the tasks
  @Get()
  async getTasks(
    @Res() response,
    @Query('userId') userId: string,
    @Query('date') date: string,
  ) {
    try {
      const taskData = await this.taskService.getAllTasks(userId, date);
      return response.status(HttpStatus.OK).json({
        message: 'All Time logs are found successfully',
        taskData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/submission')
  async getTaskForSubmission(@Res() response) {
    try {
      const taskData = await this.taskService.getTaskForApproval();
      return response.status(HttpStatus.OK).json({
        message: 'All Time logs are found successfully',
        taskData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //get task or time log by id
  @Get('/:id')
  async getTask(@Res() response, @Param('id') studentId: string) {
    try {
      const existingTask = await this.taskService.getTask(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Time log found successfully',
        existingTask,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //delete timelog by id
  @Delete('/:id')
  async deleteTask(@Res() response, @Param('id') studentId: string) {
    try {
      const deleteTask = await this.taskService.deleteTask(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Time log deleted successfully',
        deleteTask,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
