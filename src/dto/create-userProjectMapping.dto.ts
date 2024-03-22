import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateUserProjectMappingDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly projectId: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly userId: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly projectRole: string;
}
