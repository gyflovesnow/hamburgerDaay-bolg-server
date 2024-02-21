import { Injectable } from '@nestjs/common';
import { Repository,Like,EntityManager,In } from 'typeorm';
import * as uuid from 'uuid';
import { InjectRepository, InjectEntityManager} from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User as UserEntity} from './entities/user.entity'
import { ApiResult } from '../../utils/apiResult';
import { CodeEnum } from '../../common/enum/error-code'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly userManager: EntityManager,
    private readonly jwtService: JwtService
  ) {}

   /**
   * 通过用户名查询用户
   * @param username 
   * @returns 
   */
   async findOneByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } })
  }
  async create(dto: CreateUserDto) {
    if (await this.findOneByUserName(dto.username)) {
      return ApiResult.fail(CodeEnum.ACCOUNT_REPEAT.code, CodeEnum.ACCOUNT_REPEAT.msg)
    }
    // if (await this.findOneByUserName(dto.phoneNumber)) {
    //   return ApiResult.fail(CodeEnum.ACCOUNT_PHONE_NUMBER_EXIT.code, CodeEnum.ACCOUNT_PHONE_NUMBER_EXIT.msg)
    // }
    console.log(dto)
    const newUser = await this.userRepository.create({
      ...dto
    });
    newUser.userId = `U${uuid.v4()}`
    // plainToInstance  忽略转换 @Exclude 装饰器
    // const user = plainToInstance(UserEntity, dto, { ignoreDecorators: true })
    const res = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save<UserEntity>(newUser)
    })
    console.log(res)
    if (!res) return ApiResult.fail()
    return ApiResult.success(res)

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  /**
   *  校验 token
   * @param token 
   * @returns 
   */
  verifyToken(token: string): string {
    try {
      if (!token) return null
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return null
    }
  }
}
