import { AuthGuard } from '@nestjs/passport'

export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
