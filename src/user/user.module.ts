import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BossRaidHistory } from 'src/boss-raid/entities/bossRaidHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BossRaidHistory])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
