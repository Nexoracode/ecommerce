import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AppConfigModule, UserModule, AddressModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
