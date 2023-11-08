import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class AdministrationModule {}
