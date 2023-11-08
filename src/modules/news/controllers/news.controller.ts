import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Req,
  Delete,
  Get,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { SaveNewsInputDTO } from '../dto/save-news-input.DTO';
import { UserEntity } from 'src/modules/administration/entities/user.entity';
import { UpdateNewsInputDTO } from '../dto/update-news-input.DTO';
import { DeleteNewsInputDTO } from '../dto/delete-news-input.DTO';
import { NewsListInputDTO } from '../dto/news-list-input.DTO';
import { AllowAnonymous } from 'src/modules/authentication/allow-anonymous.decorator';

export type TRequest = Request & {
  user: Omit<UserEntity, 'password'>;
};

@Controller()
export class NewsController {
  @Inject(NewsService)
  private newsService: NewsService;

  @Post('news/save')
  async saveNews(@Body() input: SaveNewsInputDTO, @Req() req: TRequest) {
    return this.newsService.save(input, req.user.id);
  }

  @Put('news/update')
  async updateNews(@Body() input: UpdateNewsInputDTO) {
    return this.newsService.update(input);
  }

  @Delete('news/delete')
  async deleteNews(@Body() input: DeleteNewsInputDTO) {
    return this.newsService.delete(input.id);
  }

  @Get('news/get')
  @AllowAnonymous()
  async getNews(@Body() input: NewsListInputDTO) {
    const [items, totalCount] = await this.newsService.getList(input);

    return {
      items,
      totalCount,
    };
  }
}
