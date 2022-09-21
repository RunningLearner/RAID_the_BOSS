import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser() {
    const user = new User();

    await this.userRepository.save(user);
    const userId = user.id;

    return { userId };
  }

  async findUser(userId: number) {
    const user = await this.userRepository.findOne({
      relations: ['bossRaidHistories'],
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`'${userId}'가 존재하지 않습니다.`);
    }

    return user;
  }
}
