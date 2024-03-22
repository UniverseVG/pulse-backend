import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateProjectDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly projectName: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly tenantId: string;
}
