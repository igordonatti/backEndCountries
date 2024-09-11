import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './models/Countries/countris.module';

@Module({
  imports: [CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
