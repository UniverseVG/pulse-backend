import { Document } from 'mongoose';
export interface IProject extends Document {
  readonly projectName: string;
  readonly tenantId: string;
}
