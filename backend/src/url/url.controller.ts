import { Controller, Post, Body, Req, UseGuards, Get, HttpCode, HttpStatus, HttpException, Put, Res, Param, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { OptionalJwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @UseGuards(OptionalJwtAuthGuard)
  async shortenUrl(
    @Body('originalUrl') originalUrl: string,
    @Req() req: Request
  ) {
    let user: any = req.user ?? undefined;
    let guestId: string | undefined;

    // Check if user is authenticated
    if (!user) {
      guestId = req.headers['x-guest-id'] as string || 'guest-' + Math.random().toString(36).substring(2);
    }

    const url = await this.urlService.shortenUrl(originalUrl, user, guestId);
    const response = user ? { shortUrl: `${process.env.BASE_URL}/${url.shortCode}` } : { shortUrl: `${process.env.BASE_URL}/${url.shortCode}`, guestId }
    return response;
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  async getUrls(@Req() req: Request) {
    const user = req.user ?? undefined;
    const guestId = req.headers['x-guest-id'] as string | undefined;
    const urls = await this.urlService.findByUserOrGuest(user, guestId);
    return urls;
  }

  @Put(':id/increase-click-count')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateClickCount(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    await this.urlService.updateClickCount(id);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @Delete(':shortCode')
  async deleteUrl(@Param('shortCode') shortCode: string) {
    const deleted = await this.urlService.deleteById(shortCode);
    if (!deleted) {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'URL deleted successfully' };
  }
}
