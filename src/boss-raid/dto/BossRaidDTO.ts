import { IsNumber, IsNotEmpty } from 'class-validator';

export class EnterBossRaidDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly level: string;
}

export class EndBossRaidDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  raidRecordId: string;
}

export class RankingInfo {
  @IsNumber()
  @IsNotEmpty()
  rainking: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  totalScore: number;
}
