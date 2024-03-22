import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { IProject } from 'src/interface/project.interface';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModal: Model<IProject>) {}

  //create Task
  async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    const newProject = await new this.projectModal(createProjectDto);
    return newProject.save();
  }

  //getAllTasks
  async getAllProjects(userId: string): Promise<IProject[]> {
    const query = {
      userId,
    };

    const projectData = await this.projectModal.find(query);

    if (!projectData) {
      throw new NotFoundException(`Project with #${userId} id not found`);
    }
    return projectData;
  }

  async getProjectByIds(projectIds: string[]): Promise<IProject[]> {
    const projectData = await this.projectModal.find({
      _id: { $in: projectIds },
    });

    if (!projectData) {
      throw new NotFoundException(`Project with #${projectIds} id not found`);
    }
    return projectData;
  }
}
