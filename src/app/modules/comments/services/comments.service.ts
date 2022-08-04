import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../types/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: CommentInterface[] = [];
  commentsFilter:CommentInterface[]=[];
  activeContentId:any;
  likeArr:any=[];

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      'http://localhost:8000/comments'
    );
  }

  createComment(
    text: string,
    parentId: string | null = null, userID: any, username: any, 
    activeContentId: any, profilePic: any ,likeArr:[]
  ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      'http://localhost:8000/comments',
      {
        body: text,
        parentId,
        // Should not be set here
        createdAt: new Date().toISOString(),
        userId: userID,
        username: username,
        activeContentId: activeContentId,
        profilePic: profilePic,
        likeArr:likeArr
      }
    );
  }

  updateComment(id: string, text: string): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `http://localhost:8000/comments/${id}`,
      {
        body: text,
      }
    );
  }

  getComments2(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      'http://localhost:8000/comments'
    );
  }

  likeComment(id: string, likeArr:any): Observable<CommentInterface> {
    // console.log("from service....." ,likeArr)
    return this.httpClient.patch<CommentInterface>(
      
      `http://localhost:8000/comments/${id}`,
      
      {
        likeArr:likeArr,
      }
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(`http://localhost:8000/comments/${id}`);
  }
}
