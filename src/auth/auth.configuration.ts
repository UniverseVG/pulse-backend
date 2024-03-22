import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfiguration {
  public userPoolId: string = process.env.USERPOOL_ID;
  public clientId: string = process.env.APP_CLIENT_ID;
  public region: string = process.env.MY_AWS_REGION;
  public authority = `https://cognito-idp.${process.env.MY_AWS_REGION}.amazonaws.com/${process.env.USERPOOL_ID}`;
  jwtSecret: any;
}
