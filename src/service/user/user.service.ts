import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user';
import { IUser } from 'src/interface/user.interface';
import * as AWS from 'aws-sdk';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModal: Model<IUser>) {}

  //create User
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModal(createUserDto);

    // Trigger Cognito User Pool addition
    await this.addUserToCognito(
      newUser.email,
      newUser.emailInvite,
      newUser._id,
      newUser.role,
      newUser,
    );
    return null;
  }

  //getUser  < - get single or particular task
  async getUser(): Promise<IUser[]> {
    const existingUser = await this.userModal.find();
    if (!existingUser) {
      throw new NotFoundException(`Uses not found`);
    }
    return existingUser;
  }

  async addUserToCognito(
    email: string,
    emailInvite: boolean,
    _id: any,
    role: any,
    newUser: any,
  ): Promise<void> {
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();

    const params = {
      UserPoolId: process.env.USERPOOL_ID,
      Username: email,
      MessageAction: emailInvite === true ? null : 'SUPPRESS',
      UserAttributes: [
        {
          Name: 'custom:userId',
          Value: _id.toString(),
        },
        {
          Name: 'custom:role',
          Value: role,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.adminCreateUser(params, (err, data) => {
        if (err) {
          console.error('Error adding user to Cognito User Pool:', err);
          reject(err);
        } else {
          newUser.save();
          console.log('User added to Cognito User Pool:', data);
          resolve();
        }
      });
    });
  }
}
