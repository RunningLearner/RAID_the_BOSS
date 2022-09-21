import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser() {
    return await this.userService.createUser;
  }

  @Get(':userId')
  async findUser(@Param('userId') userId: number) {
    const { totalScore, bossRaidHistories } = await this.userService.findUser(
      userId,
    );

    return { totalScore: totalScore, bossRaidHistory: bossRaidHistories };
  }
}
