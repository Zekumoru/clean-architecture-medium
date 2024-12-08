import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class DeleteUserByIdInteractor {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
