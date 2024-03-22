import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserProjectMappingDto } from 'src/dto/create-userProjectMapping.dto';
import { IUserProjectMapping } from 'src/interface/userProjectMapping.interface';

@Injectable()
export class UserProjectMappingService {
  constructor(
    @InjectModel('UserProjectMapping')
    private userProjectMappingModal: Model<IUserProjectMapping>,
  ) {}

  //create Task
  async createMapping(
    createUserProjectMappingDto: CreateUserProjectMappingDto,
  ): Promise<IUserProjectMapping> {
    console.log({ createUserProjectMappingDto });
    const newMapping = await new this.userProjectMappingModal(
      createUserProjectMappingDto,
    );
    return newMapping.save();
  }

  //getAllTasks
  async getAllMapping(userId: string): Promise<IUserProjectMapping[]> {
    const query = {
      userId,
    };

    const mapData = await this.userProjectMappingModal.find(query);

    if (!mapData) {
      throw new NotFoundException(`mapping  with #${userId} id not found`);
    }
    return mapData;
  }
}
