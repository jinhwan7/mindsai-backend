export interface AuthLogoutInboundPort {
  execute(userId: number): Promise<void>;
}
