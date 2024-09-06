import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthApiKeyGuard extends AuthGuard('api-key') {}
