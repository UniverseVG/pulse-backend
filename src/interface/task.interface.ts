import { Document } from 'mongoose';
export interface ITask extends Document {
  readonly project: string;
  readonly task: string;
  readonly description: string;
  readonly start: string;
  readonly end: string;
  readonly duration: string;
  readonly userId: string;
  readonly projectId: string;
  readonly submitId: string;
  readonly approval: boolean;
  readonly approvedId: string;
  readonly date: string;
}
