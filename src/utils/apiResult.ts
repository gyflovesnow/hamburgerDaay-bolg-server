import { ApiProperty } from '@nestjs/swagger'
export class ApiResult {
    @ApiProperty({ type: 'number', default: 200 })
    code: number

    @ApiProperty({ type: 'string', default: 'OK' })
    message?: string

    data?: any
    constructor(code: number = 200, message?: string, data?: any) {
        this.code = code
        this.message = message || 'OK'
        this.data = data || null
    }
    static success(data?: any, message?: string, code: number = 200): ApiResult {
        return new ApiResult(code, message, data)
    }
    static fail(code: number = 0, message: string = 'fail', data?: any): ApiResult {
        return new ApiResult(code, message, data)
    }
}