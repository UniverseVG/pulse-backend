import { Document } from 'mongoose';
export interface IUserProjectMapping extends Document {
  readonly projectId: string;
  readonly userId: string;
  readonly projectRole: string;
}
