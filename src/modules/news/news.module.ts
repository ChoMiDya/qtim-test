import { Module } from '@nestjs/common';
import { AdministrationModule } from '../administration/administration.module';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';

@Module({
  imports: [AdministrationModule],
  providers: [NewsService],
  controllers: [NewsController],
  exports: [],
})
export class NewsModule {}
