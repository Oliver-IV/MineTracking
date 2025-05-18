import { IsOptional, IsString, ValidateNested } from "class-validator";

export class UpdateRouteDto {

    @IsString()
    @IsOptional()
    startId: string

    @IsString()
    @IsOptional()
    endId: string

}