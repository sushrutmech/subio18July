import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { app_session_name } from '../shared/constants/app.constants';
import { LoginResponse } from '../shared/interfaces/authenticate';
import { ChangePasswordRequest } from '../shared/interfaces/change-password.request';
import { RegisterUserRequest } from '../shared/interfaces/register-user.request';
import { User } from '../shared/interfaces/user';
import { LoginRequest } from '../shared/requests/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private currentUserSession: BehaviorSubject<>;
   nulll!:any

  private currentUserSession: BehaviorSubject<LoginResponse>;

  app_session_name: string = '_session.subio.CU';
  //currentUserSession = new BehaviorSubject(null)
  dataCurrentUser!:any

  currentUserInfo(){

    let dataLocal: any = localStorage.getItem(this.app_session_name)
    console.log("token ", dataLocal)
    this.dataCurrentUser = JSON.parse(dataLocal)

    return this.dataCurrentUser
  }


  constructor(private http: HttpClient) {
    let dataLocal: any = localStorage.getItem(this.app_session_name)
    //console.log("token ", JSON.parse(dataLocal))
    this.dataCurrentUser = JSON.parse(dataLocal)
    
    //this.currentUserSession.next(dataJoson)
    this.currentUserSession = new BehaviorSubject<LoginResponse|any>(this.dataCurrentUser)


  }

  //sign up method
  registerUser(params: RegisterUserRequest) {
    return this.http.post<any>(`${environment.apiEndPoint}/auth/RegisterUser`, params)

  }

  //session getter.......
  public get userSession(): any {
    return this.currentUserSession.value;
  }

  //login service ...
  login(params: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiEndPoint}/auth/login`, params)
      .pipe(map(response => {
        //encryption and decryption .... is pending here
        localStorage.setItem(this.app_session_name, JSON.stringify(response))
        return response
      }))

  }

  userData(params: LoginRequest) {
    return this.login(params).pipe()
  }

  //logout method 
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.app_session_name);
    this.currentUserSession.next(this.nulll);
  }

  updateProfile(params: User) {
    return this.http.post<number>(`${environment.apiEndPoint}/auth/updateUser`, params)
      .pipe(map(response => {
        var newSession = this.userSession;
        newSession.user.firstName = params.firstName;
        newSession.user.lastName = params.lastName;
        newSession.user.userID = params.userID;
        localStorage.setItem(app_session_name, JSON.stringify(newSession));
        this.currentUserSession.next(newSession);
      }));
  }

  changePassword(params: ChangePasswordRequest) {
    let url = `${environment.apiEndPoint}/auth/changepassword?user_id=${params.user_id}&oldpassword=${params.oldpassword}&newpassword=${params.newpassword}`
    return this.http.post<number>(url, null);
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.apiEndPoint}/auth/ForgotPassword?email=${email}`, null, { responseType: 'text' });
  }




}


