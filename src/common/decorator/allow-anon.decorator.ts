/*
 * @Author: hamburgerDaddy
 * @Date: 2024-1-21 10:26:42
 * @LastEditTime: 2024-1-21 12:27:12
 * @Description: 努力！
 * @FilePath: \nest-hamburgerDaddy-blog\src\common\decorator\allow-anon.decorator.ts
 * 
 */
import { SetMetadata } from '@nestjs/common'

export const ALLOW_ANON = 'allowAnon'
/**
 * 允许 接口 不校验 token
 */
export const AllowAnon = () => SetMetadata(ALLOW_ANON, true)