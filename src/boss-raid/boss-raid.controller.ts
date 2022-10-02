import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { BossRaidService } from './boss-raid.service';
import { EnterBossRaidDto, EndBossRaidDto } from './dto/BossRaidDTO';

@Controller('boss-raid')
export class BossRaidController {
  constructor(private readonly bossRaidService: BossRaidService) {}

  @Get('/')
  async getBossRaidStatus() {
    return this.bossRaidService.getBossRaidStatus();
  }

  @Post('/enter')
  async enterBossRaid(@Body() enterBossRaidRequestDto: EnterBossRaidDto) {
    return this.bossRaidService.enterBossRaid(enterBossRaidRequestDto);
  }

  @Patch('/end')
  async endBossRaid(@Body() endBossRaidRequestDto: EndBossRaidDto) {
    return this.bossRaidService.endBossRaid(endBossRaidRequestDto);
  }

  @Get('topRankerList')
  async getRankList(@Body() userId: number) {
    return this.bossRaidService.getRankList(userId);
  }
}
