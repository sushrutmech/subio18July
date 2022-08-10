import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeContent } from '../shared/interfaces/home-content';

@Injectable({
  providedIn: 'root'
})
export class GlobleDataserviceService {

  data: any;

  caroselData = new Subject<any>()


  constructor(
    private http: HttpClient,
  ) { }

  getHomeContent(userID: any) {
    return this.http.post<HomeContent>(`${environment.apiEndPoint}/library/getDashboardDetails?UserID=${userID}`, {});

  }
  getContentList(userID: any) {
    return this.http.post<any>(`${environment.apiEndPoint}/library/GetContentList?UserID=${userID}`, {});
  }
  GetContentExerciseList(userID: any) {
    return this.http.post<any>(`${environment.apiEndPoint}/library/GetContentExerciseList?UserID=${userID}`, {});
  }

}
