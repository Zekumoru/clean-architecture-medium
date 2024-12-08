import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class GetAllUsersInteractor {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAll();

    return users;
  }
}
