export class ClientCredentials {

  public static empty(): ClientCredentials {
    return new ClientCredentials('', '');
  }

  constructor(private _username: string, private _password: string) {}

  get username(): string { return this._username; }
  set username(value: string) { this._username = value; }

  get password(): string { return this._password; }
  set password(value: string) { this._password = value; }

  public asJson() {
    return {
      email: this._username,
      password: this._password,
    };
  }

  public asJsonString(): string {
    return JSON.stringify(this.asJson());
  }

}
