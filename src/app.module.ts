import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { BossRaidController } from './boss-raid/boss-raid.controller';
import { BossRaidService } from './boss-raid/boss-raid.service';
import { BossRaidModule } from './boss-raid/boss-raid.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      entities: [],
      synchronize: true,
    }),
    UserModule,
    BossRaidModule,
  ],
  controllers: [AppController, UserController, BossRaidController],
  providers: [AppService, UserService, BossRaidService],
})
export class AppModule {}
