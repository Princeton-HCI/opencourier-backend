export class UserSessionEntity {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  refreshExpiresIn: number

  constructor(accessToken: string, refreshToken: string, tokenType: string, expiresIn: number, refreshExpiresIn: number) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresIn = expiresIn
    this.refreshExpiresIn = refreshExpiresIn
    this.tokenType = tokenType
  }
}
