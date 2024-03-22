import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop()
  userName: string;
  @Prop()
  email: string;
  @Prop()
  role: string;
  @Prop()
  emailInvite: boolean;
  @Prop()
  tenantId: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1, tenantId: 1 });

export { UserSchema };
