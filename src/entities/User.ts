export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string
  ) {}

  validate(): void {
    if (this.username.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }
    if (this.password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
  }
}
