
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyLibraryService } from 'src/app/modules/my-library/my-library.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit,OnDestroy  {

  @Input() src:any;
  @Input() contentDescriptionJson:any;
  @Output() onVideoEnd: EventEmitter<any> = new EventEmitter();
  @Input() openFrom:any;
  @Input() closeVideofrom:boolean=false;
  @Output() videoDurationForOutSide:EventEmitter<any> = new EventEmitter();

  contentId:any;
  current: any
  videoPlayer!: VgApiService;
  currentTimeVideo: any;
  videoDuration: any;
  videoWatchTimePercent: any;
  homeContentFromLocal: any;
  homeContentFromLocalJson:any;
  updateHomeContent:any;
  homeContent: string = "homeContentUpdated"
  t2:any;




  constructor(
    public router: Router,
    private myLibraryService: MyLibraryService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.contentId=this.contentDescriptionJson.contentID
    console.log("content description from view content" , this.contentDescriptionJson)
    this.getHomeContentLocalStorage()
    console.log("form video player component " ,this.contentId )
    this.myLibraryService.getContentList2().subscribe(res=>{
      console.log("resuslt library content " , res)
    },
    err=>{
       console.log("errors ..." , err)
    })

  }

  ngOnDestroy(): void {
    console.log("ng on destroy is called .....++++" , "id-",this.contentId, "time-",this.currentTimeVideo)
    this.addToMarkContentStarted(this.contentId,Math.floor(this.currentTimeVideo))
    this.handleReadContent()
    clearInterval(this.t2)
  }

  addToMarkContentStarted(contentId:any , PlayTime:any){
    this.myLibraryService.markContentSarted(contentId , PlayTime).subscribe(res=>{
      console.log("resuslt " , res)
    },
    err=>{
       console.log("errors ..." , err)
    })
  }

  handleReadContent() {
    this.spinner.show();
    this.myLibraryService.markContentAsRead(this.contentId).subscribe(result => {
      console.log("response from add to readlist" , result)
      this.spinner.hide();
    })
  }

 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] && changes['src'].currentValue) {
      this.src = changes['src'].currentValue;
    }
  }

  videoDurationEmits(){
    this.videoDuration=this.videoDurationForOutSide.emit()
  }

  markContentStartedForLibrary(){
    console.log("library time start is called")
    this.currentTimeVideo = this.videoPlayer.getDefaultMedia().currentTime
    console.log("**duration video", this.videoPlayer.getDefaultMedia().duration)
    console.log("current time " , this.currentTimeVideo)
  }

  videoPlayerInit(data: VgApiService) {
    this.videoPlayer = data;
    this.videoPlayer.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoPlayer.getDefaultMedia().subscriptions.ended.subscribe(this.handleVideoWatched.bind(this));
    console.log("**-*- videoDuration", this.videoDuration)
    //console.log("**" ,this.videoPlayer.getDefaultMedia())
    //console.log("time",this.videoPlayer.getDefaultMedia().currentTime)
    console.log("openfrommmm", this.openFrom)
    if (this.openFrom==="fromlibrary") {
      console.log("closeVideofrom..value" , this.closeVideofrom)
      this.t2 = setInterval(() => {
        console.log("closeVideofrom..value" , this.closeVideofrom)
        if (this.closeVideofrom==true) {
          clearInterval(this.t2)
        }
        this.markContentStartedForLibrary()
        
       
      },1000)
      console.log("t2 time interval" , this.t2)
      
    }
    this.currentTimeVideo = this.videoPlayer.getDefaultMedia().currentTime
    console.log("**-*-", this.videoPlayer.getDefaultMedia().duration)
    //this clear interval stop settimeInterval after leaving the video page 
    let t = setInterval(() => {
      if(this.router.url.includes('layout/home')==true){
       // console.log("router if condition is called .. and time at this moment." ,Math.floor(this.currentTimeVideo))
        //console.log("content Id",this.contentId )
        this.addToMarkContentStarted(this.contentId,Math.floor(this.currentTimeVideo))
        clearInterval(t)
     }else{
       //console.log("router else condition is called....." , this.router.url.includes('layout/home'))
     }
      this.currentTimeVideo = this.videoPlayer.getDefaultMedia().currentTime
      this.videoDuration = this.videoPlayer.getDefaultMedia().duration
      this.videoWatchTimePercent = this.currentTimeVideo / this.videoDuration * 100
     // console.log("curret time video...", this.currentTimeVideo)
      console.log("**-*- videoDuration", this.videoDuration)
      this.videoDurationForOutSide.emit(this.videoDuration)
     // console.log("percentage watch time...", this.videoWatchTimePercent)
      this.homeContentFromLocal = localStorage.getItem("homeContent")
      this.homeContentFromLocalJson = JSON.parse(this.homeContentFromLocal)

     // console.log("actinve link " ,this.src)
      this.homeContentFromLocalJson.userProgramContent.forEach((ele:any) => {
        if (ele.contentLocation==this.src) {
          ele.watchPerctent=this.videoWatchTimePercent
          localStorage.setItem("watchTimePercent",JSON.stringify(this.homeContentFromLocalJson))
          //console.log("<<" , )
        }else{
          ele.watchPerctent=0
        }
      });

      let activeContent = this.homeContentFromLocalJson.userProgramContent.filter(
         (x:any)=>{
           return x.contentLocation==this.src
        }
     )
      //console.log("fromLocal storage", this.homeContentFromLocalJson)
     // console.log("active content++" , activeContent )
     // console.log( "update array ",this.updateHomeContent)
      if (this.videoDuration == this.currentTimeVideo) {
        console.log("if condition is calling .....")
        clearInterval(t)
      }

      


    }, 1000)

    console.log("t value ...", t)

  }

  getHomeContentLocalStorage() {
    this.homeContentFromLocal = localStorage.getItem(this.homeContent)
    this.homeContentFromLocalJson = JSON.parse(this.homeContentFromLocal)
    console.log(this.homeContentFromLocalJson)
  }


  initVdo() {
    this.videoPlayer.play();
  }

  handleVideoWatched() {
   
    this.onVideoEnd.emit();
  }

}
