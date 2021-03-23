export class UserDeviceDto {
    ip: string
    browser: string
    userAgent: string
    token?: string
    expiredAt?: number
    createdAt?: number
}