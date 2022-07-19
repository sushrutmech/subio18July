import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute , NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobleDataserviceService } from 'src/app/appServices/globle-dataservice.service';
import { ProgramContentTypes } from 'src/app/shared/constants/program-content-types';
import { UserProgramContent } from 'src/app/shared/interfaces/home-content';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnChanges {

  @Input() programContents!: UserProgramContent[];
  @Input() videoIndex: number = -1;
  @Output() onRequestClose: EventEmitter<boolean> = new EventEmitter();
  courseData: any;


  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private globalDataSevice: GlobleDataserviceService,
  ) {

    // console.log("**** from watch" ,   this.globalDataSevice.caroselData.subscribe(
    //   courseData=>{
    //     this.courseData=courseData
    //   }
    // ) )



  }


  isDataLoaded: boolean = false;
  activeIndex: number = -1;
  activeContent!: UserProgramContent;
  visibleWatchNextButton: boolean = false;
  visibleBackToHomeButton: boolean = false;

  //contentType = ProgramContentTypes;

  contentType: string = ""
  contentDescription: any;
  contentDescriptionJson:any;

  ngOnInit(): void {
  
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

  handleReadContent() {
    this.spinner.show();
    this.homeService.markContentAsRead(this.activeContent.contentID, this.activeContent.programStepID).subscribe(result => {
      this.validateNextContentButtonVisible();
      this.spinner.hide();
    })
  }

  validateNextContentButtonVisible() {
    if (this.activeIndex === (this.programContents.length - 1)) {
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


}
