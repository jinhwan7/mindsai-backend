export class AuthToken {
  constructor(
    private _accessToken: string,
    private _refreshToken: string,
  ) {}

  get accessToken(): Readonly<string> {
    return this._accessToken;
  }

  get refreshToken(): Readonly<string> {
    return this._refreshToken;
  }
}
