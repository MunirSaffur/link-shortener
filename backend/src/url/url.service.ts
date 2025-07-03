import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { User } from '../user/user.entity';
import { nanoid } from 'nanoid';  // npm install nanoid

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepo: Repository<Url>,
  ) {}

  async shortenUrl(originalUrl: string, user?: User, guestId?: string) {
    const shortCode = nanoid(7);
    const url = this.urlRepo.create({
      originalUrl,
      shortCode,
      userId: user?.id,
      guestId: !user ? guestId : null,
    }as Partial<Url>);

    return await this.urlRepo.save(url);
  }

  async findByUserOrGuest(user?: Partial<User>, guestId?: string): Promise<Url[]> {
    if (user?.id) {
      return this.urlRepo.find({ where: { userId: user.id } });
    } else if (guestId) {
      return this.urlRepo.find({ where: { guestId } });
    }
    return [];
  }

  async updateClickCount(id: number) {
  const url = await this.urlRepo.findOne({ where: { id } });
  if (!url) {
    throw new Error('URL not found');
  }
  url.click_count = (url.click_count ?? 0) + 1;
  return this.urlRepo.save(url);
}

async deleteById(shortCode: string): Promise<boolean> {
  const result = await this.urlRepo.delete({ shortCode });
  return (result.affected ?? 0) > 0;
}

async findByShortCode(shortCode: string): Promise<Url | null> {
  return this.urlRepo.findOne({ where: { shortCode } });
}
}
