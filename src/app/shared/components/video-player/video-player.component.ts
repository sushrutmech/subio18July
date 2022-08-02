
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MyLibraryService } from 'src/app/modules/my-library/my-library.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit  {

  @Input() src:any;
  @Input() contentDescriptionJson:any;
  @Output() onVideoEnd: EventEmitter<any> = new EventEmitter();
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




  constructor(
    public router: Router,
    private myLibraryService: MyLibraryService
  ) { }

  ngOnInit(): void {
    this.contentId=this.contentDescriptionJson.contentID
    this.getHomeContentLocalStorage()
    console.log("form video player component " ,this.contentId )

  }

  addToMarkContentStarted(contentId:any , PlayTime:any){
    this.myLibraryService.markContentSarted(contentId , PlayTime).subscribe(res=>{
      console.log("resuslt " , res)
    },
    err=>{
       console.log("errors ..." , err)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] && changes['src'].currentValue) {
      this.src = changes['src'].currentValue;
    }
  }



  videoPlayerInit(data: VgApiService) {
    this.videoPlayer = data;
    this.videoPlayer.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoPlayer.getDefaultMedia().subscriptions.ended.subscribe(this.handleVideoWatched.bind(this));
    //console.log("**" ,this.videoPlayer.getDefaultMedia())
    //console.log("time",this.videoPlayer.getDefaultMedia().currentTime)
    this.currentTimeVideo = this.videoPlayer.getDefaultMedia().currentTime
    console.log("**-*-", this.videoPlayer.getDefaultMedia().duration)
    //this clear interval stop settimeInterval after leaving the video page 
    let t = setInterval(() => {
      if(this.router.url.includes('layout/home')==true){
        console.log("router if condition is called .. and time at this moment." , this.currentTimeVideo)
        console.log("content Id",this.contentId )
        this.addToMarkContentStarted(this.contentId,this.currentTimeVideo)
        clearInterval(t)
     }else{
       console.log("router else condition is called....." , this.router.url.includes('layout/home'))
     }
      this.currentTimeVideo = this.videoPlayer.getDefaultMedia().currentTime
      this.videoDuration = this.videoPlayer.getDefaultMedia().duration
      this.videoWatchTimePercent = this.currentTimeVideo / this.videoDuration * 100
      console.log("curret time video...", this.currentTimeVideo)
      //console.log("**-*- videoDuration", this.videoDuration)
     // console.log("percentage watch time...", this.videoWatchTimePercent)
      this.homeContentFromLocal = localStorage.getItem("homeContent")
      this.homeContentFromLocalJson = JSON.parse(this.homeContentFromLocal)

     // console.log("actinve link " ,this.src)
      this.homeContentFromLocalJson.userProgramContent.forEach((ele:any) => {
        if (ele.contentLocation==this.src) {
          ele.watchPerctent=this.videoWatchTimePercent
          localStorage.setItem("watchTimePercent",JSON.stringify(this.homeContentFromLocalJson))
          console.log("<<" , )
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
