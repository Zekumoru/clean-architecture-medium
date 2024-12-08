import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class FindUserByIdInteractor {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    return user;
  }
}
