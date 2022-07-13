export interface ChangePasswordRequest {
  user_id: number;
  oldpassword: string;
  newpassword: string;
}