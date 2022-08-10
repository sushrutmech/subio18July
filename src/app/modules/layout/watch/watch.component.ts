import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute , NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/appServices/auth.service';
import { GlobleDataserviceService } from 'src/app/appServices/globle-dataservice.service';
import { ProgramContentTypes } from 'src/app/shared/constants/program-content-types';
import { UserProgramContent, UserProgramInstance } from 'src/app/shared/interfaces/home-content';
import { User } from 'src/app/shared/interfaces/user';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnChanges {

  //@Input() programContents!: UserProgramContent[];
  @Input() videoIndex: number = -1;
  @Output() onRequestClose: EventEmitter<boolean> = new EventEmitter();
  courseData: any;
  userSession!: User;
  currentUserId:any;
  currentUserName:any;
  activeContentId:any;
  profilePic:any;
  transcriptData:any=[];
  ExerciseList:any=[];


  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private globalDataSevice: GlobleDataserviceService,
    private authService: AuthService,
    private _globledataService:GlobleDataserviceService
  ) {

    this.userSession = this.authService.userSession.user;
    this.currentUserId=this.userSession.userID
    this.currentUserName=this.userSession.firstName 
    this.profilePic=this.userSession.profilePic
    //console.log("profile ...." ,this.userSession.profilePic )
   
  }


  isDataLoaded: boolean = false;
  activeIndex: number = -1;
  activeContent!: UserProgramContent;
  visibleWatchNextButton: boolean = false;
  visibleBackToHomeButton: boolean = false;

  programInstance!: UserProgramInstance;
  programContents!: UserProgramContent[];
  nextVideoIndex: number = -1;
  hasData: boolean = false;

  //contentType = ProgramContentTypes;

  contentType: string = ""
  contentDescription: any;
  contentDescriptionJson:any;

  ngOnInit(): void {
    this.callHomeContentAPI();
    this.contentDescription= this.route.snapshot.queryParamMap.get("videoData")
    this.contentDescriptionJson=JSON.parse(this.contentDescription)
    this.activeContentId=this.contentDescriptionJson.contentID
    console.log("user id //**//**" ,this.activeContentId )
    console.log("form watch now **//--" , this.contentDescriptionJson.contentID)
    console.log("url .. ", this.contentDescriptionJson.contentLocation) 
    this.GetContentExerciseList();
    this.GetContentList(); 



  }

  ngOnChanges(changes: any): void {
    if (changes.programContents && changes.programContents.currentValue) {
      this.programContents = changes.programContents.currentValue;
    }
    if (changes.videoIndex && changes.videoIndex.currentValue) {
      this.activeIndex = changes.videoIndex.currentValue;
    }
    this.validateProps();
  }

  validateProps() {
    if (this.videoIndex !== -1) {
      this.activeIndex = this.videoIndex;
    } else {
      this.activeIndex = this.programContents.findIndex(x => x.readCount === 0);
    }
    this.activeContent = this.programContents[this.activeIndex];
    this.isDataLoaded = true;
  }

  handleReadContent(contentID:any , programStepID:any) {
    this.spinner.show();
    console.log("before the marklist service")
    this.homeService.markContentAsRead(contentID, programStepID).subscribe(result => {
      this.validateNextContentButtonVisible();
      console.log("1...... after the marklist service")
      this.spinner.hide();
    })
    console.log("2...... after the marklist service")
  }

  validateNextContentButtonVisible() {
    if (this.contentDescriptionJson === (this.programContents.length - 1)) {
      this.visibleBackToHomeButton = true;
    } else {
      this.visibleWatchNextButton = true;
    }
  }

  nextContent() {
    this.visibleWatchNextButton = false;
    this.activeIndex++;
    this.activeContent = this.programContents[this.activeIndex];
  }

  onWatchLaterClick() {
    this.onRequestClose.emit(true);
  }

  backToHomeClick() {
    this.onRequestClose.emit(true);
  }

  callHomeContentAPI() {
    this.spinner.show();
    this.homeService.getHomeContent().subscribe(results => {
      if (results.userProgramContent.length > 0 && results.userProgramInstance.length > 0) {
        this.programInstance = results.userProgramInstance[0];
        this.programContents = results.userProgramContent;
        //this.contentType=results.userProgramContent;
        this.nextVideoIndex = this.programContents.findIndex(x => x.readCount === 0);
        if (this.nextVideoIndex === -1) {
          let allRead = this.programContents.filter(x => x.readCount > 0).length;
          if (allRead === this.programContents.length) {
            this.nextVideoIndex = this.programContents.length + 1;
          }
        }
        //this.startTimer();
        this.hasData = true;
      } else {
        this.hasData = false;
      }
      this.isDataLoaded = true;
      this.spinner.hide();
    })
  }

  GetContentExerciseList(){
    this.spinner.show();
    this._globledataService.GetContentExerciseList(this.currentUserId).subscribe(
      {
        next:(res:any)=>{
          console.log("Exercise list ", res)
          this.ExerciseList=res
          console.log("exerxide ++ data " , this.ExerciseList)
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
          console.log("++++----", res )
          console.log("content id " , this.activeContentId)
          this.transcriptData=  res.filter((x:any)=>{
            return x.contentID==this.activeContentId
          })
          
          console.log("transcriptdata after sort" , this.transcriptData)
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
