import { User } from '../entities/User';

export interface UserRepository {
  getAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
}
