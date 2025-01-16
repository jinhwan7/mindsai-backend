export class User {
  constructor(
    private _id: number,
    private _uniqueName: string,
    private _nickName: string,
    private _password: string,
    private _refreshToken: string,
  ) {}

  get id(): Readonly<number> {
    return this._id;
  }

  get uniqueName(): Readonly<string> {
    return this._uniqueName;
  }

  get nickName(): Readonly<string> {
    return this._nickName;
  }

  get password(): Readonly<string> {
    return this._password;
  }

  get refreshToken(): Readonly<string> {
    return this._refreshToken;
  }

  set password(value: string) {
    this._password = value;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }
  static from(data: {
    id?: number;
    uniqueName: string;
    nickName: string;
    password: string;
    refreshToken?: string;
  }) {
    return new User(
      data.id ?? NaN,
      data.uniqueName,
      data.nickName,
      data.password,
      data.refreshToken ?? '',
    );
  }
}
