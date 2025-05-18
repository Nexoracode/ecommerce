import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AppConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
