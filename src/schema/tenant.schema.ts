import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Tenant {
  @Prop()
  tenantName: string;
}

const TenantSchema = SchemaFactory.createForClass(Tenant);

export { TenantSchema };
