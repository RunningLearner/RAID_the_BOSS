import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { BossRaidController } from './boss-raid/boss-raid.controller';
import { BossRaidService } from './boss-raid/boss-raid.service';
import { BossRaidModule } from './boss-raid/boss-raid.module';

@Module({
  imports: [UserModule, BossRaidModule],
  controllers: [AppController, UserController, BossRaidController],
  providers: [AppService, UserService, BossRaidService],
})
export class AppModule {}
