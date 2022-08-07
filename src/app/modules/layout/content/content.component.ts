import { Component, OnDestroy, OnInit } from '@angular/core';


import { SuccessGoal } from 'src/app/shared/interfaces/success-goal';
import { KeyToSuccessService } from '../../key-to-success/key-to-success.service';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { ProgramContentTypes } from '../../../shared/constants/program-content-types';
import { UserProgramContent, UserProgramInstance } from '../../../shared/interfaces/home-content';
import { HomeService } from '../home.service';

import { MyLibraryService } from '../../my-library/my-library.service'


import { AuthService } from '../../../appServices/auth.service'
import { User } from 'src/app/shared/interfaces/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { OnHoverKeyComponent } from 'src/app/shared/components/on-hover-key/on-hover-key.component';
//import {OnHoverKeyComponent} from '../../../shared/components/on-hover-key'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  isDataLoaded: boolean = false;
  successGoalList: SuccessGoal[] = [];
  selectedSuccessGoal!: SuccessGoal;

  programInstance!: UserProgramInstance;
  programContents!: UserProgramContent[];

  hasData: boolean = false;
  isWatchVideo: boolean = false;
  isJoinAllowed: boolean = false;
  nextVideoIndex: number = -1;
  selectedVideoIndex: number = -1;
  timeSubscription?: Subscription;
  contentType = ProgramContentTypes;
  userSession!: User;
  dateProgram: any;


  i!: number
  allGoalData: any
  teamGoalList: any = []
  MyGoalList: any = []
  BusinessGoalList: any = []
  MyGoalListLength:any=[]

  renderGoalTabMessage:boolean=false;

  end: any;

  rate = 4;
  suggestedList: any = [];
  readingList: any = [];
  readingHistory: any = [];
  excludeSwitch: boolean = false;

  searchResult: any = [];
  searchForm!: FormGroup;
  selectedContent: any;




  isSearched: boolean = false;
  courseDate: any
  homeContentLocalStorage: any;
  watchTimePercentage: number = 0;

  tabIndex:any
  keyDisplay:boolean=false;
  keyDisplayActiveId:number=0;
  userSuccessGoalId:any;
  timerCourse:any;
  homeTabIndex:any=0;

  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private myLibraryService: MyLibraryService,
    private myKeysToSuccessService: KeyToSuccessService,
    private fb: FormBuilder,
    public dialog: MatDialog

  ) {

    this.userSession = authService.userSession.user;
    this.homeService.getHomeContent().subscribe(results => {
      console.log("prog data", results.userProgramInstance[0].dateStart)
      var CurrentDate = moment().format();
      console.log("current date", CurrentDate)
      this.courseDate = String(moment(results.userProgramInstance[0].dateStart).format())

    })
    this.mainHomeTabChange(0)

this.timerCourse= setInterval(() => {

      let now1 = moment(this.courseDate);
      let now2 = moment();
      //console.log("set interval calling...")
      if (this.homeTabIndex==1 || this.homeTabIndex==2) {
        console.log("if condition is calling .....")
        clearInterval(this.timerCourse)
      } else{
        //console.log("else block is calling ")
        this.timerCourse
      }
      var days = moment
        .duration(moment(this.courseDate, 'YYYY/MM/DD HH:mm')
          .diff(moment(now2, 'YYYY/MM/DD HH:mm'))
        ).asDays();
      //console.log("future days", days);

      let hour1 = now1.get('hour');
      
      //console.log("sar hour" , hour1)
      let hour2 = now2.get('hour');
      let minute1 = now1.get('minute');
      let minute2 = now2.get('minute');

      let HH = document.getElementById('m')
      let RHH = Math.abs(24-Math.abs(((hour2) - hour1)))-1
     
      HH!.innerHTML = String(Math.abs(Math.floor(RHH)));
     // console.log("giett dom ele" , HH!.innerHTML)
     
      let SS = document.getElementById('s')
      let RSS =  (60-Math.abs(minute2 - minute1))

      SS!.innerHTML = String(Math.abs(Math.floor(RSS)));

      let DD = document.getElementById('h')

      DD!.innerHTML = String(Math.abs(Math.floor(days)));

    }, 1000)

  }

  mainHomeTabChange(data:any){
    console.log("tab change " , data.index)
    this.homeTabIndex=data.index
    if(this.homeTabIndex==0){
      this.timerCourse= setInterval(() => {

        let now1 = moment(this.courseDate);
        let now2 = moment();
        //console.log("set interval calling...")
        if (this.homeTabIndex==1 || this.homeTabIndex==2) {
          console.log("if condition is calling .....")
          clearInterval(this.timerCourse)
        } else{
         // console.log("else block is calling ")
          this.timerCourse
        }
        var days = moment
          .duration(moment(this.courseDate, 'YYYY/MM/DD HH:mm')
            .diff(moment(now2, 'YYYY/MM/DD HH:mm'))
          ).asDays();
        //console.log("future days", days);
  
        let hour1 = now1.get('hour');
        
        //console.log("sar hour" , hour1)
        let hour2 = now2.get('hour');
        let minute1 = now1.get('minute');
        let minute2 = now2.get('minute');
  
        let HH = document.getElementById('m')
        let RHH = Math.abs(24-Math.abs(((hour2) - hour1)))-1
       
        HH!.innerHTML = String(Math.abs(Math.floor(RHH)));
       // console.log("giett dom ele" , HH!.innerHTML)
       
        let SS = document.getElementById('s')
        let RSS =  (60-Math.abs(minute2 - minute1))
  
        SS!.innerHTML = String(Math.abs(Math.floor(RSS)));
  
        let DD = document.getElementById('h')
  
        DD!.innerHTML = String(Math.abs(Math.floor(days)));
  
      }, 1000)

    }
  }

  ngOnInit(): void {
    this.callHomeContentAPI();
    this.getSuccessGoalList();
    this.getBusinessGoalList();
    this.getMyGoalList();
    this.getTeamGoakList();
    this.getAllContent();
    this.homeContentLocalStorageFun()

    this.searchForm = this.fb.group({
      searchInput: '',
      excludeSwitch: false
    })
    console.log("*-*-", this.MyGoalList, this.MyGoalList.length)
    //console.log("*-*-", this.allGoalData, this.allGoalData.length)
    console.log("*-*-", this.teamGoalList, this.teamGoalList.length)
    console.log("*-*-", this.BusinessGoalList, this.BusinessGoalList.length)

    
    console.log("/*/*/*", this.allGoalData)
    
  }

  ngOnDestroy(): void {
    console.log("ng on destroy is calledd ")
    this.timerCourse= clearInterval(this.timerCourse)
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(){
   
  }

  homeContentLocalStorageFun() {
    this.homeService.getHomeContent().subscribe(results => {
      this.homeContentLocalStorage = results
      this.homeContentLocalStorage.userProgramContent.map(
        (x: any) => {
          x.contentImage = this.watchTimePercentage
        }
      )

      console.log(this.homeContentLocalStorage.userProgramContent)

      localStorage.setItem("homeContent", JSON.stringify(this.homeContentLocalStorage))
    })

  }

  callHomeContentAPI() {
    this.spinner.show();
    this.homeService.getHomeContent().subscribe(results => {
      if (results.userProgramContent.length > 0 && results.userProgramInstance.length > 0) {
        this.programInstance = results.userProgramInstance[0];
        this.programContents = results.userProgramContent;
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


  handleWatchVideo(index: number = -1) {
    this.selectedVideoIndex = index;
    this.isWatchVideo = true;
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

    if (moment(dt).format('DD/MM/YYYY').toLowerCase() != 'invalid date') {
      return moment(dt).format('DD/MM/YYYY');
    } else {
      return dt;
    }
  }




  getSuccessGoalList() {
    this.spinner.show();
    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      if (results.length > 0) {
        this.successGoalList = results;
        this.selectedSuccessGoal = this.successGoalList[0];
      }
      this.isDataLoaded = true;
      this.spinner.hide();
    });
  }


  getTeamGoakList() {
    //this.spinner.show();
    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results
      this.teamGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/UExURQAAAN/f397e3tfX19jY2Nra2tnZ2dfX19nZ2djY2NfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2d4gwvcAAAAUdFJOUwAQHyAuMD1AUFtgcICPn6+/z9/vYpxEMwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAUNJREFUOE/tk8lyxCAMRK04BDJsBvT/35rWgjM19ySXdM3hldRAIzPHn4lSdAr5NKD4MLh1TuahlBezdqkzr6C1LVSYM4BgYibQQ6Brd+uSUgWQAMuZRcD238pS0mQDMAVOKRWhb5U55EA0+7osfhqryNFPouA3AzkctEuu0CV0xcooJw5ckqqUfFuVFqD1Vg242V0hywElL3DVe6na9vMOcPeSDkS17qX7mhdLGOgdkRTgBhstM2GQttvA+qbUJ2fzo+NzwVFaqZ2H+XuVnyju/I1H0EqaO39PvD6VwvRviZ65PmB0F1JEnUWoHmxyNBfxJHfhRpYiBHfhk5irhOBTwSHRCL17/OZi0O06bPjPzxCughmACk/MwFwNS15cJ3KACh5ec9cDT+zf9dMuKoXOLM8tlnzEnEClBMr55W/7SzqOL4sFKnpMQsP8AAAAAElFTkSuQmCC" }
      )
      this.isDataLoaded = true;
    })

    return this.teamGoalList

  }

  getMyGoalList() {
    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results
      this.MyGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAMAAAAZd2syAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAN/f39fX19ra2tfX19nZ2dfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2VMHktcAAAAQdFJOUwAQIDBAUGBwgI+fr7/P3+8jGoKKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABUUlEQVQ4T9VT3daEIAgU0yzzh/d/2m8gas09u9/1zkVHbGAGKPeDoLR5O35DYebFzp+xgMWbBZ9BQlstmBD2fPsJre/kVJae4r4zdzsDFHOVinRwsitFEqFgQahIEuRjUhfb3VRXI6GetUJRnstKbq1VziHGrXNTWoLEWStxwQPZZVfFqO+bhxjzcTcAray2BMgkqVO8WyUeWtolvhy/mtfR8bAxLKaeUhCDV5t+lnjYBOVCKtvxPIclt2pu2oQZ1gEUwkXQVrscXyC1Fp0HSewRDHekTttXa5p69rDBbtjuaV/Q7psFwC45jbOFF87u6204ycQqzE4QFRDVPQATHiWH+obKbQFxPyNUD0gdlmDAzlZwLzfYupR8zkPQUKnctILpIPP54QK4iwNNB1PngWhvNNIU75qHdD/T3oBt4cv9l+Z1MaFfv8wnpMdf9jtw7g+gCBMfF5RfCQAAAABJRU5ErkJggg==" }
      )
      this.isDataLoaded = true;
      console.log("/*/*/*++++---", this.MyGoalListLength , this.MyGoalListLength.length)
    })
    
    return this.MyGoalList
  }


  getBusinessGoalList() {

    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results

      // console.log("**++--//", this.allGoalData)

      this.BusinessGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAMAAAAZd2syAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAN/f39fX19ra2tfX19nZ2dfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2VMHktcAAAAQdFJOUwAQIDBAUGBwgI+fr7/P3+8jGoKKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAj0lEQVQ4T+XRQQ6EIAwF0FJRGUDo/U87k/ZjTECXJmTeqm1+rFaaxxKySTsmI1zllDAb2KV+zCHiMOwFKai8CKPsPcc4YFU+l0aRiHJDijLe+kb7aLR34myxtP0UNKrFliu9KqMxGiJarzTm0aj2O/Bwo8ccLkVrKpNbUZsXDtL7v1hAP1Y8YkTuCTJTI/oCJP0pPY2k3a4AAAAASUVORK5CYII=" }
      )
      this.isDataLoaded = true;
    })

    return this.BusinessGoalList



  }




  setSuccessGoal(item: SuccessGoal) {
    this.selectedSuccessGoal = item;
  }


  getRoundedValue(rate: number) {
    return Math.ceil(rate);

  }

  getAllContent() {
    this.spinner.show();
    this.myLibraryService.getContentList().subscribe(result => {
      //debugger;
      this.spinner.hide();
      this.isDataLoaded = true;
      if (result.length > 0) {
        this.suggestedList = result.filter(x => x.list.toLowerCase() == 'suggested reading');
        this.readingList = result.filter(x => x.list.toLowerCase() == 'reading list');
        this.readingHistory = result.filter(x => x.list.toLowerCase() == 'read');
      }
    });
  }

  addToReadingList(contentId: any) {
    this.spinner.show();
    this.myLibraryService.addToReadingList(contentId).subscribe(result => {
      // this.spinner.hide();
      this.getAllContent();
      this.searchTerm();

    });
  }

  searchTerm() {
    if (this.searchForm.value.searchInput) {
      this.spinner.show();

      this.myLibraryService.searchTerm(this.searchForm.value.searchInput, this.searchForm.value.excludeSwitch).subscribe((result: any) => {
        this.isSearched = true;
        this.searchResult = result;
        this.spinner.hide();
      })
    }

  }


  handleWatchVideoo(data: any = null) {
    this.selectedContent = data;
    this.isWatchVideo = true;
  }



  handleContentViewerClose(ev: any) {
    if (ev) {
      this.getAllContent();
      this.searchTerm()
    }
    this.selectedContent = null;
    this.isWatchVideo = false;
  }

  selectedTabChange(event:MatTabChangeEvent){
    this.tabIndex=event.index
    console.log(event)
    this.getAllContent(); 
  }

  over(index:any) {
    console.log("Mouseover event called");
    this.keyDisplay=true
    this.keyDisplayActiveId=index
    this.userSuccessGoalId=index
    //apply zoom-in logic here
  }
  displayKey(index:any){
    console.log("Mouseover click called");
    this.keyDisplay=true
    this.keyDisplayActiveId=index
    this.userSuccessGoalId=index

  }
  out() {
    console.log("Mouseout event called");
    this.keyDisplay=false
    //apply zoom-out logic here
  }


  openDialog(index:any ,item:any) {
    const dialogRef = this.dialog.open(OnHoverKeyComponent, {
      data: {
        animal: 'panda',
        userSuccessGoalId:index,
        goalData:item

      },
    });
    //console.log("parrent", index)

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }




}
