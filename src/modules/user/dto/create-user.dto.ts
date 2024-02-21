import { IsNotEmpty,IsString,Length,IsIn,IsNumber,MinLength,MaxLength, Max} from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist"
export class CreateUserDto {
    @ApiProperty({
        example:'admin',
        description:'用户名',
    })
    @IsNotEmpty({message:'用户名不能为空'})
    @IsString({message:'用户名必须为字符串'})
    @MinLength(3,{message:'用户名长度不能小于3'})
    @MaxLength(20,{message:'用户名长度不能大于20'})
    username: string;
    @ApiProperty({description:"昵称"})
    @IsString()
    @Length(0,50)
    nickname:string;
    @ApiProperty({description:'手机号'})
    @IsString()
    @Length(0,11)
    phone:string;
    @ApiProperty({description:'密码'})
    @IsString()
    password:string;
    @ApiProperty({description:'状态',default:1})
    @IsNumber()
    status:number;
    @ApiProperty({description:'备注'})
    @IsString()
    remark:string;
}
