import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


 import * as moment from 'moment';

import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { GlobleDataserviceService } from 'src/app/appServices/globle-dataservice.service';
import {ProgramContentTypes } from '../../../shared/constants/program-content-types'
import { UserProgramContent, UserProgramInstance } from '../../../shared/interfaces/home-content'
import {HomeService } from '../home.service'



@Component({
  selector: 'app-carousel-container',
  templateUrl: './carousel-container.component.html',
  styleUrls: ['./carousel-container.component.scss']
})
export class CarouselContainerComponent implements OnInit {

  programInstance!: UserProgramInstance;
  programContents!: UserProgramContent[];
  isDataLoaded: boolean = false;
  hasData: boolean = false;
  isWatchVideo: boolean = false;
  isJoinAllowed: boolean = false;
  nextVideoIndex: number = -1;
  selectedVideoIndex: number = -1;
  timeSubscription!: Subscription;
  contentType:any= ProgramContentTypes;
  selectedContent:any;
  courseData!:any;


  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private globalDataSevice:GlobleDataserviceService,

  ) {

    this.globalDataSevice.caroselData.subscribe(courseData=>{
      this.courseData=courseData
    })

   }

  ngOnInit(): void {
    this.callHomeContentAPI();
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  callHomeContentAPI() {
    this.spinner.show();
    this.homeService.getHomeContent().subscribe(results => {
      if (results.userProgramContent.length > 0 && results.userProgramInstance.length > 0) {
        this.programInstance = results.userProgramInstance[0];
        this.programContents = results.userProgramContent;
        //this.contentType= results.userProgramContent;
        this.nextVideoIndex = this.programContents.findIndex(x => x.readCount === 0);
        if (this.nextVideoIndex === -1) {
          let allRead = this.programContents.filter(x => x.readCount > 0).length;
          if (allRead === this.programContents.length) {
            this.nextVideoIndex = this.programContents.length + 1;
          }
        }
        this.startTimer();
        this.hasData = true;
      } else {
        this.hasData = false;
      }
      this.isDataLoaded = true;
      this.spinner.hide();
    })
  }

  handleWatchVideo(data:any) {
   //this.selectedVideoIndex = index;
    //this.selectedContent=this.selectedVideoIndex
    
    console.log(data)
   
    var url = "layout/media/"+ JSON.stringify(data.contentTypeName)
    this.router.navigate([url]);
    //this.isWatchVideo = true;
  }

  handleVideoPlayerClose(dataRefresh: boolean) {
    if (dataRefresh) {
      this.callHomeContentAPI();
    }
    this.isWatchVideo = false;
    this.selectedVideoIndex = -1;
  }

  startTimer() {
    var startTime = moment(this.programInstance.dateStart);
    var endTime = moment(this.programInstance.dateEnd);
    this.validateTimeToJoin(startTime, endTime);
    this.timeSubscription = timer(((60 - Number(moment().format('ss'))) * 1000), 60000).subscribe((t) => {
      this.validateTimeToJoin(startTime, endTime);
    });
  }

  validateTimeToJoin(startTime: moment.Moment, endTime: moment.Moment) {
    var currentTime = moment();
    var isValid = (startTime.diff(currentTime, 'minutes') < 15 && endTime.diff(currentTime, 'minutes') >= 0);
    if (isValid) {
      this.isJoinAllowed = true;
    } else {
      this.isJoinAllowed = false;
    }
  }

  getFormattedDate(date: string) {
    var diff = moment().diff(date, 'minutes');
    let dt = moment().subtract(diff, 'minutes').calendar();
  
    if(moment(dt).format('DD/MM/YYYY').toLowerCase() != 'invalid date') {
      return  moment(dt).format('DD/MM/YYYY');
    } else {
      return dt;
    }    
  }






}
