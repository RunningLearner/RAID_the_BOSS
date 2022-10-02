import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { BossRaidController } from './boss-raid.controller';
import { BossRaidService } from './boss-raid.service';
import { BossRaidHistory } from './entities/bossRaidHistory.entity';

@Module({
  controllers: [BossRaidController],
  providers: [BossRaidService, UserService],
  imports: [
    UserModule,
    HttpModule,
    TypeOrmModule.forFeature([User, BossRaidHistory]),
  ],
})
export class BossRaidModule {}
