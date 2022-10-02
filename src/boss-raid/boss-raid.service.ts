import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterBossRaidDto, EndBossRaidDto } from './dto/BossRaidDTO';
import { BossRaidHistory } from './entities/bossRaidHistory.entity';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';
import { User } from 'src/user/entities/user.entity';

export interface Level {
  level: number;
  score: number;
}

export interface BossRaid {
  userId: number;
  canEnter: boolean;
  enteredAt: Date;
}

export interface CurrentBossRaid {
  enteredUserId: number;
  raidRecordId: number;
  score: number;
  level: number;
}

export interface BosRaidsStaticData {
  // 제한 시간 (sec)
  bossRaidLimitSeconds: number;

  //레벨 별 레이드 처치 점수
  levels: Level[];
}

@Injectable()
export class BossRaidService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(BossRaidHistory)
    private bossRaidHistoryRepository: Repository<BossRaidHistory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(UserService) private userService: UserService,
    @Inject(HttpService) private readonly httpService: HttpService,
  ) {}

  async onModuleInit() {
    const URL = `https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json`;
    try {
      const bossRaidStaticData = (await this.httpService.axiosRef.get(URL))
        .data;
      await this.cacheManager.set(
        'bossRaidStaticData',
        bossRaidStaticData.bossRaids[0],
        { ttl: 30000 },
      );
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getBossRaidStatus() {
    const currentRaid = await this.cacheManager.get<CurrentBossRaid>(
      'currentRaid',
    );

    const raidStatus = { canEnter: true, enteredUserId: 0 };

    if (currentRaid) {
      raidStatus.canEnter = false;
      raidStatus.enteredUserId = currentRaid.enteredUserId;
    }

    return raidStatus;
  }

  async enterBossRaid(enterBossRaidDto: EnterBossRaidDto) {
    const currentUser = await this.userService.findUser(
      parseInt(enterBossRaidDto.userId),
    );

    const bossRaids = await this.cacheManager.get<BosRaidsStaticData>(
      'bossRaidStaticData',
    );
    console.log(bossRaids);
    let raidInfo = bossRaids.levels[parseInt(enterBossRaidDto.level)];

    // 보스 레이드에 존재하지 않는 level 값이 입력됐다면, NotFoundException
    if (!raidInfo) {
      throw new NotFoundException(
        `level '${enterBossRaidDto.level}' doesn't exist.`,
      );
    }

    const currentRaid = new BossRaidHistory();
    currentRaid.user = currentUser;
    currentRaid.level = raidInfo.level;
    await this.bossRaidHistoryRepository.save(currentRaid);

    raidInfo = Object.assign(raidInfo, {
      enteredUserId: currentUser.id,
      raidRecordId: currentRaid.raidRecordId,
    });

    await this.cacheManager.set('currentRaid', raidInfo, {
      ttl: bossRaids.bossRaidLimitSeconds,
    });
    return { isEntered: true, raidRecordId: currentRaid.raidRecordId };
  }

  async endBossRaid(endBossRaidRequestDto: EndBossRaidDto) {
    const currentRaid = await this.cacheManager.get<CurrentBossRaid>(
      'currentRaid',
    );

    const raid = await this.bossRaidHistoryRepository.findOneBy({
      raidRecordId: parseInt(endBossRaidRequestDto.raidRecordId),
    });
    console.log('HERE IS CURAID', currentRaid);
    raid.score = currentRaid.score;
    await this.bossRaidHistoryRepository.save(raid);
    await this.userService.changeUserScore(
      currentRaid.enteredUserId,
      raid.score,
    );
    await this.cacheManager.del('currentRaid');
  }

  async getRankList(userId: number) {
    let topRankerList = await this.cacheManager.get('topRankerList');

    if (!topRankerList) {
      topRankerList = await this.userRepository
        .createQueryBuilder('user')
        .select('ROW_NUMBER () OVER (ORDER BY "total_score" DESC)', 'ranking')
        .addSelect('user.id', 'userId')
        .addSelect('user.totalScore', 'totalScore')
        .getRawMany();

      console.log(topRankerList);
      await this.cacheManager.set('topRankerList', topRankerList, {
        ttl: 1000,
      });
    }

    return {
      topRankerList: topRankerList,
    };
  }
}
