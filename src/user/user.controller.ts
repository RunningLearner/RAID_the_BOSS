import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(): Promise<any> {
    return;
  }
}
