import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class UpdateUserInteractor {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, username: string, password: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User does not exists!');
    }
    user.username = username;
    user.password = password;
    user.validate();

    await this.userRepository.update(user);

    return user;
  }
}
