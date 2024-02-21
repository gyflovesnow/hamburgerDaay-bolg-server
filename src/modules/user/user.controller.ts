import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty,ApiParam, ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DemoPipe } from '../../demo.pipe';
import {User as UserEntity} from './entities/user.entity';
import { AllowAnon } from '../../common/decorator/allow-anon.decorator';

@Controller({
  path:'user', // 路由前缀
  version:'1' // 版本号
})
@ApiTags('用户管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'authoriation',
  required:false,
  description: '本次请求请带上token'
})
@AllowAnon()
// @Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiResponse({status:201,description:'创建成功',type:[UserEntity]})
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary:'创建用户'})
  // @SwaggerApi(UserEntity)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'获取用户详情'})
  @ApiParam({name:'id',description:'用户ID',required:true})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
