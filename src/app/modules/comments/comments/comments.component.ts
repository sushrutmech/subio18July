import { Component, Input, OnInit } from '@angular/core';
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
  @Input() currentUserName!:string;
  @Input() activeContentId:any;

  comments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
      console.log("coments without filterr" , this.comments)
      console.log("comments filtering .... " ,this.comments.filter((x:any)=>{
        return x.activeContentId==this.activeContentId
      }))
      this.comments=this.comments.filter((x:any)=>{
        return x.activeContentId==this.activeContentId
      })
     
    });
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
      .createComment(text, parentId ,this.currentUserId , this.currentUserName ,this.activeContentId)
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
