export class UserListQuery {
  uniqueName?: string;
  nickName?: string;

  constructor(data: { uniqueName?: string; nickName?: string }) {
    this.uniqueName = data.uniqueName;
    this.nickName = data.nickName;
  }
}
