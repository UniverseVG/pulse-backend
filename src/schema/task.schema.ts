import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Task {
  @Prop()
  project: string;
  @Prop()
  task: string;
  @Prop()
  description: string;
  @Prop()
  start: string;
  @Prop()
  end: string;
  @Prop()
  duration: string;
  @Prop()
  userId: string;
  @Prop()
  projectId: string;
  @Prop()
  submitId: string;
  @Prop()
  approval: boolean;
  @Prop()
  approverId: string;
  @Prop()
  date: string;
}

const TaskSchema = SchemaFactory.createForClass(Task);

export { TaskSchema };
