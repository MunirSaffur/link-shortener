import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]),
  AuthModule],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [UrlService],  // if other modules use it
})
export class UrlModule {}
