import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async getAll(): Promise<User[]> {
    const users = Array.from(this.users.values());
    return users;
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async update(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async deleteById(id: string): Promise<void> {
    if (!this.users.get(id)) {
      throw new Error(`User with id ${id} does not exist!`);
    }

    this.users.delete(id);
  }
}
