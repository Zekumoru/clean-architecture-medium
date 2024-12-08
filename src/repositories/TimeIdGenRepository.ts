import { IdGenRepository } from './IdGenRepository';

export class TimeIdGenRepository implements IdGenRepository {
  generateId(): string {
    return Date.now().toString();
  }
}
