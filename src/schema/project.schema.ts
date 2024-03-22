import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Project {
  @Prop()
  projectName: string;
  @Prop()
  tenantId: string;
}

const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ projectName: 1, tenantId: 1 });

export { ProjectSchema };
