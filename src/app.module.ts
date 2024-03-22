import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TaskService } from './service/task/task.service';
import { TaskController } from './controller/task/task.controller';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { UserSchema } from './schema/user.schema';
import * as AWS from 'aws-sdk/global';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { TenantSchema } from './schema/tenant.schema';
import { ProjectSchema } from './schema/project.schema';
import { UserProjectMappingSchema } from './schema/userProjectMapping.schema';
import { ProjectController } from './controller/project/project.controller';
import { ProjectService } from './service/project/project.service';
import { UserProjectMappingController } from './controller/userProjectMapping/userProjectMapping.controller';
import { UserProjectMappingService } from './service/userProjectMapping/userProjectMapping.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vgm:z9DAvRK5MU78tDc5@cluster0.nnlqb7n.mongodb.net/',
      {
        dbName: 'timify-pulse',
      },
    ),
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Tenant', schema: TenantSchema },
      { name: 'Project', schema: ProjectSchema },
      { name: 'UserProjectMapping', schema: UserProjectMappingSchema },
    ]),
    PassportModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  controllers: [
    AppController,
    TaskController,
    UserController,
    ProjectController,
    UserProjectMappingController,
  ],
  providers: [
    AppService,
    TaskService,
    UserService,
    ProjectService,
    UserProjectMappingService,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS credentials and/or region are missing from environment variables.',
      );
    }

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }
}
