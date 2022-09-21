import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BossRaidHistory } from 'src/boss-raid/entities/bossRaidHistory.entitiy';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  totalScort: number;

  @OneToMany(() => BossRaidHistory, (bossRaidHistory) => bossRaidHistory.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bossRaidHistories: BossRaidHistory[];
}
