import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { ITask } from 'src/interface/task.interface';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModal: Model<ITask>) {}

  //create Task
  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = await new this.taskModal(createTaskDto);
    return newTask.save();
  }

  //update Tasks
  async updateTasks(
    taskIds: string[],
    updateTask: UpdateTaskDto[],
  ): Promise<ITask[]> {
    const updatedTasks = [];

    for (const i in taskIds) {
      const taskId = taskIds[i];
      const taskUpdate = updateTask[i];

      const existingTask = await this.taskModal.findByIdAndUpdate(
        taskId,
        taskUpdate,
        { new: true },
      );

      if (!existingTask) {
        console.warn(`Task with #${taskId} id not found`);
      } else {
        updatedTasks.push(existingTask);
      }
    }

    return updatedTasks;
  }

  //getAllTasks
  async getAllTasks(userId: string, date?: string): Promise<ITask[]> {
    const query = {
      userId,
    };
    if (date) {
      query['date'] = date;
    }

    const taskDataByUserId = await this.taskModal.find(query);

    if (!taskDataByUserId) {
      throw new NotFoundException(`Task with #${userId} id not found`);
    }
    return taskDataByUserId;
  }

  async getTaskForApproval(): Promise<ITask[]> {
    const taskData = await this.taskModal.find();
    const submissionData = taskData.filter(
      (item) => item.submitId && item.approval === false,
    );

    if (!submissionData) {
      throw new NotFoundException(`No time logs found`);
    }
    return submissionData;
  }

  //getTask  < - get single or particular task
  async getTask(taskId: string): Promise<ITask> {
    const existingTask = await this.taskModal.findById(taskId);
    if (!existingTask) {
      throw new NotFoundException(`Task with #${taskId} id not found`);
    }
    return existingTask;
  }

  //getTask by user id

  //deleteTask
  async deleteTask(taskId: string): Promise<ITask> {
    const deletedTask = await this.taskModal.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new NotFoundException(`Task with #${taskId} id not found`);
    }
    return deletedTask;
  }
}
