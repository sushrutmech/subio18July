import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CommentsComponent,
    CommentFormComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    CommentsComponent,
    CommentFormComponent,
    CommentComponent
  ]
})
export class CommentsModule { }
