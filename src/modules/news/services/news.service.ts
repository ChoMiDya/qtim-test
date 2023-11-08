import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsListInputDTO } from '../dto/news-list-input.DTO';
import { dataSource } from 'src/config/typeorm';
import { NewsEntity } from '../entities/news.entity';
import { Between, FindOptionsWhere } from 'typeorm';
import { SaveNewsInputDTO } from '../dto/save-news-input.DTO';
import { UpdateNewsInputDTO } from '../dto/update-news-input.DTO';
@Injectable()
export class NewsService {
  private newsRepository = dataSource.getRepository(NewsEntity);

  async getList(input: NewsListInputDTO): Promise<[NewsEntity[], number]> {
    const { skip, take = 25, authorId, date } = input;
    const where: FindOptionsWhere<NewsEntity> = {};

    if (authorId) {
      where.authorId = authorId;
    }

    if (date) {
      where.createdAt = Between(
        new Date(date + ' 00:00:00').getTime(),
        new Date(date + ' 23:59:59').getTime(),
      );
    }

    return this.newsRepository.findAndCount({
      where,
      skip,
      take,
    });
  }

  async save(input: SaveNewsInputDTO, authorId: string): Promise<NewsEntity> {
    return this.newsRepository.save({
      ...input,
      authorId,
      createdAt: Date.now(),
    });
  }

  async update(input: UpdateNewsInputDTO): Promise<NewsEntity> {
    const { id, header, body } = input;

    const exist = await this.newsRepository.findOne({
      where: {
        id,
      },
    });

    if (!exist) {
      throw new NotFoundException();
    }

    await this.newsRepository.update(
      { id },
      {
        header,
        body,
        updatedAt: Date.now(),
      },
    );

    return this.newsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const exist = await this.newsRepository.findOne({
      where: {
        id,
      },
    });

    if (!exist) {
      throw new NotFoundException();
    }

    return this.newsRepository.delete({
      id,
    });
  }
}
