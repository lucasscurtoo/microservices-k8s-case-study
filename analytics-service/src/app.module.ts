import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbProvider } from './db/db.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, dbProvider],
})
export class AppModule {}
