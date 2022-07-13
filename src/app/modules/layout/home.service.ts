
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment'
import {User } from '../../shared/interfaces/user'
import {HomeContent } from "../../shared/interfaces/home-content"
import { AuthService} from '../../appServices/auth.service'



@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userSession!: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.userSession = this.authService.userSession.user;
   }

   getHomeContent() {
    return this.http.post<HomeContent>(`${environment.apiEndPoint}/library/getDashboardDetails?UserID=${this.userSession.userID}`, {});
    
  }

  markContentAsRead(ContentID: number, ProgramStepID: number) {
    return this.http.post<number>(`${environment.apiEndPoint}/library/markContentAsRead?UserID=${this.userSession.userID}&ContentID=${ContentID}&ProgramStepID=${ProgramStepID}`, {});
  }



}
