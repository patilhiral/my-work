import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto{
    @IsString()
    @Length(5,255,{message:'The name is wrong length'})
    name: string;
    @Length(5,255)
    description: string;
    @IsDateString()
    when: string;
    @Length(5,255)
    address: string;

}