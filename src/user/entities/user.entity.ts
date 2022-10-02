import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BossRaidHistory } from 'src/boss-raid/entities/bossRaidHistory.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  totalScore: number;

  @OneToMany(() => BossRaidHistory, (bossRaidHistory) => bossRaidHistory.user)
  bossRaidHistories: BossRaidHistory[];
}
