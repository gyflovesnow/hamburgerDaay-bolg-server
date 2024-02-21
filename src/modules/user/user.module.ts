import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User as UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 导出 UserService，以便在其他模块中使用
})
export class UserModule {}
