import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    console.log('OptionalJwtAuthGuard handleRequest err:', err);
    console.log('OptionalJwtAuthGuard handleRequest user:', user);
    console.log('OptionalJwtAuthGuard handleRequest info:', info);
    return user || undefined;
  }
}