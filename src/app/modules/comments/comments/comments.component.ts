import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { CommentsService } from '../services/comments.service';
import { ActiveCommentInterface } from '../types/activeComment.interface';
import { CommentInterface } from '../types/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() currentUserId!: string;
  @Input() currentUserName!: string;
  @Input() activeContentId: any;
  @Input() profilePic: any;
  likeArrr: any = [];
  likeArr: any = [];

  comments: CommentInterface[] = [];
  comments1: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  commentsFilter: CommentInterface[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
      console.log("coments without filterr", this.comments)
      console.log("comments filtering .... ", this.comments.filter((x: any) => {
        return x.activeContentId == this.activeContentId
      }))
      this.comments = this.comments.filter((x: any) => {
        return x.activeContentId == this.activeContentId
      })

    });
    this.commentsService.getComments2().subscribe((comments) => {
      this.comments1 = comments;
    })
  }

  filter(s: any) {
    return s = this.currentUserId
  }

  likePushFuc(commentId: any): any {

    this.commentsService.getComments2().subscribe((comments) => {
      this.comments1 = comments;
    })
    console.log(this.comments1)
    this.commentsFilter = this.comments1.filter((x: any) => {
      return x.id == commentId
    })
    this.likeArrr = []
    this.likeArrr = this.commentsFilter[0].likeArr
    if (!this.likeArrr.includes(this.currentUserId)) {
      console.log("if condition ....", this.likeArrr)
      this.likeArrr.push(this.currentUserId)
    } else {
      console.log("else condition", this.likeArrr)
      let newfiltArr: any = []
      this.likeArrr.forEach((element: any) => {
        console.log("*-*/*", element)
        if (element != this.currentUserId) {
          newfiltArr.push(element)
        }
      });
      console.log("after filterr same id ", newfiltArr)
      this.likeArrr = newfiltArr
      //this.likeArrr.push(this.currentUserId)
    }

    return this.likeArrr
  }

  likeComment(commentId: any) {
    // console.log("value form comments section " , commentId , this.currentUserId)
    // console.log("array without fill",this.likeArr )
    //console.log(this.likePushFuc(commentId))
    let newA = this.likePushFuc(commentId)
    //console.log("returen function ...", newA)
    //console.log("array after filterr and fill ", this.likeArrr)
    this.commentsService.likeComment(commentId, newA).subscribe(res => {
      console.log("like ..", res)
    }, err => {
      console.log("like ..", err)
    })
  }

  getRootComments(): CommentInterface[] {
    return this.comments.filter((comment) => comment.parentId === null);
  }

  updateComment({
    text,
    commentId,
  }: {
    text: string;
    commentId: string;
  }): void {
    this.commentsService
      .updateComment(commentId, text)
      .subscribe((updatedComment) => {
        this.comments = this.comments.map((comment) => {
          if (comment.id === commentId) {
            return updatedComment;
          }
          return comment;
        });

        this.activeComment = null;
      });
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    });
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  addComment({
    text,
    parentId
  }: {
    text: string;
    parentId: string | null;
  }): void {
    this.commentsService
      .createComment(text, parentId, this.currentUserId, this.currentUserName,
        this.activeContentId, this.profilePic, this.likeArr)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      });
  }

  getReplies(commentId: string): CommentInterface[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }
}
