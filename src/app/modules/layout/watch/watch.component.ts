import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute , NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobleDataserviceService } from 'src/app/appServices/globle-dataservice.service';
import { ProgramContentTypes } from 'src/app/shared/constants/program-content-types';
import { UserProgramContent, UserProgramInstance } from 'src/app/shared/interfaces/home-content';
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
 


  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private globalDataSevice: GlobleDataserviceService,
  ) {



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
    console.log("form watch **" , this.contentDescriptionJson)
    console.log("url .. ", this.contentDescriptionJson.contentLocation) 



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


}