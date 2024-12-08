import { nanoid } from 'nanoid';
import { IdGenRepository } from './IdGenRepository';

export class NanoIdGenRepository implements IdGenRepository {
  generateId(): string {
    return nanoid();
  }
}
