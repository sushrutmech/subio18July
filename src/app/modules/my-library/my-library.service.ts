
import { HttpClient } from'@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/interfaces/user';
import { HomeContent } from '../../shared/interfaces/home-content';
import { AuthService } from '../../appServices/auth.service';
import { LibraryListInstance , SearchLibrary } from '../../shared/interfaces/library-list'



@Injectable({
  providedIn: 'root'
})
export class MyLibraryService {

  userSession!: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.userSession = this.authService.userSession.user;
   }

   getContentList() {
    return this.http.post<LibraryListInstance[]>(`${environment.apiEndPoint}/Library/GetContentList?UserID=${this.userSession.userID}`, {})
    // .pipe(map(results => {
    //   results.map(x => {
    //     x.contentLocation = `${environment.serverURL}${x.contentLocation}`
    //     return x;
    //   })
    //   return results;
    // }));
  }

  addToReadingList(contentId:any){
    return this.http.post<any>(`${environment.apiEndPoint}/Library/AddToReadingList?UserID=${this.userSession.userID}&ContentID=${contentId}`, {});
  }

  searchTerm(searchTerm:any, isExcluded:any) {
    return this.http.post<SearchLibrary[]>(`${environment.apiEndPoint}/Library/SearchLibrary?UserID=${this.userSession.userID}&SearchTerm=${searchTerm}&ExcludeRead=${isExcluded}`, {})
  }

  addLikeDisLike(contentId:any, isLiked:any) {
    return this.http.post<any>(`${environment.apiEndPoint}/Library/LikeUnlikeContent?UserID=${this.userSession.userID}&ContentID=${contentId}&isLiked=${isLiked}`, {});    
  }

  addRating(contentId:any, rating:any, review:any) {
    return this.http.post<any>(`${environment.apiEndPoint}/Library/AddRating?UserID=${this.userSession.userID}&ContentID=${contentId}&Rating=${rating}&review=${review}`, {});    
  }

  markContentAsRead(contentId:any) {
    return this.http.post<any>(`${environment.apiEndPoint}/Library/AddToReadList?UserID=${this.userSession.userID}&ContentID=${contentId}`, {});
  }

  markContentSarted(contentId:any ,PlayTime:any){
    return this.http.post<any>(`${environment.apiEndPoint}/Library/MarkContentStarted?UserID=${this.userSession.userID}&ContentID=${contentId}&PlayTime=${PlayTime}`, {});
  }





}
