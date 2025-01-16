import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ModulesModule } from '../module/modules.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ModulesModule, CommonModule],
  controllers: [AppController],
})
export class AppModule {}
