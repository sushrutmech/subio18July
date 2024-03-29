import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import {ProgramContentTypes } from '../../constants/program-content-types'
import {UserProgramContent } from '../../../shared/interfaces/home-content'
import { LibraryListInstance , SearchLibrary } from '../../../shared/interfaces/library-list'
import { MyLibraryService } from '../../../modules/my-library/my-library.service'
import { AuthService } from 'src/app/appServices/auth.service';
import { User } from '../../interfaces/user';
import { GlobleDataserviceService } from 'src/app/appServices/globle-dataservice.service';


@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {

  @Input() selectedContent:any ;
  @Output() onRequestClose: EventEmitter<boolean> = new EventEmitter();

  userRating!: number;
  isLiked: boolean = false;
  userSession!: User;
  currentUserId:any;
  currentUserName:any;
  activeContentId:any;
  profilePic:any;
  transcriptData:any=[];
  ExerciseList:any=[];
  fromlibrary:any="fromlibrary"
  fromlibraryClose:boolean=false;

  constructor(
    private myLibraryService: MyLibraryService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private _globledataService:GlobleDataserviceService
  ) {
    this.userSession = this.authService.userSession.user;
    this.currentUserId=this.userSession.userID
    this.currentUserName=this.userSession.firstName 
    this.profilePic=this.userSession.profilePic
    this.fromlibrary="fromlibrary"
    console.log("profile ...." ,this.userSession.profilePic )
   }

  isDataLoaded: boolean = false;
  activeIndex: number = -1;
  activeContent!: UserProgramContent;
  visibleWatchNextButton: boolean = false;
  visibleBackToHomeButton: boolean = false;

  contentType = ProgramContentTypes;

  ngOnInit(): void {
    this.handleReadContent();
    console.log("app view content is called ....")
    
    this.GetContentExerciseList();
    this.GetContentList(); 
  }

  ngOnChanges(changes: any): void {
    if (changes.selectedContent && changes.selectedContent.currentValue) {
      this.selectedContent = changes.selectedContent.currentValue;
      this.isLiked = this.selectedContent.isLiked;
    }
    this.isDataLoaded = true;
  }

  handleReadContent() {
    this.spinner.show();
    this.myLibraryService.markContentAsRead(this.selectedContent.contentID).subscribe(result => {
      this.spinner.hide();
    })
  }

  backToLibraryClick() {
    this.fromlibraryClose=true
    console.log("fromlibraryClose" , this.fromlibraryClose)
    this.onRequestClose.emit(true);
  }
  onShareRatingClick(review:any) {
    this.spinner.show();
    this.myLibraryService.addRating(this.selectedContent.contentID, this.userRating, review).subscribe(result => {
      this.spinner.hide();
      this.selectedContent.rating = this.userRating;
      this.selectedContent.review = review;
      this.userRating = 0;
    });
  }

  onLikeClick() {
    this.isLiked = !this.isLiked;
    this.spinner.show();
    this.myLibraryService.addLikeDisLike(this.selectedContent.contentID, this.isLiked).subscribe(result => {
      this.selectedContent.isLiked = this.isLiked;
      this.spinner.hide();
    });
  }
  onRate(ev:any){
    debugger
    this.userRating= ev.newValue;
  }

  GetContentExerciseList(){
    this.spinner.show();
    this._globledataService.GetContentExerciseList(this.currentUserId).subscribe(
      {
        next:(res:any)=>{
          //console.log("Exercise list ", res)
          this.ExerciseList=res
          //console.log("exerxide ++ data " , this.ExerciseList)
          this.spinner.hide();
         
        },
        error:(res:any)=>{
          console.log("error,,,, exersie list " , res)
          this.spinner.hide();
        }
      }
    )

  }

  GetContentList(){
    this.spinner.show();
    this._globledataService.getContentList(this.currentUserId).subscribe(
      {
        next:(res:any)=>{
          //console.log("++++----", res)
          this.transcriptData=  res.filter((x:any)=>{
            return x.contentID==this.selectedContent.contentID
          })
          
         // console.log("transcriptdata after sort" , this.transcriptData)
          this.spinner.hide();
        },
        error:(res:any)=>{
          console.log("error,,,," , res)
          this.spinner.hide();
        }
      }
    )

  }
  

}
