export class User {
  constructor(
    private id: number,
    private uniqueName: string,
    private nickName: string,
    private password: string,
    private refreshToken?: string,
  ) {}

  getId(): Readonly<number> {
    return this.id;
  }

  getUniqueName(): Readonly<string> {
    return this.uniqueName;
  }

  getNickName(): Readonly<string> {
    return this.nickName;
  }

  getPassword(): Readonly<string> {
    return this.password;
  }

  getRefreshToken(): Readonly<string> {
    return this.refreshToken;
  }
}
