import { User } from '../entities/User';
import { IdGenRepository } from '../repositories/IdGenRepository';
import { UserRepository } from '../repositories/UserRepository';

export class CreateUserInteractor {
  constructor(
    private userRepository: UserRepository,
    private idGenRepository: IdGenRepository
  ) {}

  async execute(username: string, password: string): Promise<User> {
    const id = this.idGenRepository.generateId();
    const user = new User(id, username, password);

    user.validate();

    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
