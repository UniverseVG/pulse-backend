import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class UserProjectMapping {
  @Prop()
  projectId: string;
  @Prop()
  userId: string;
  @Prop()
  projectRole: string;
}

const UserProjectMappingSchema =
  SchemaFactory.createForClass(UserProjectMapping);
UserProjectMappingSchema.index({ projectId: 1 });
UserProjectMappingSchema.index({ userId: 1 });

export { UserProjectMappingSchema };
