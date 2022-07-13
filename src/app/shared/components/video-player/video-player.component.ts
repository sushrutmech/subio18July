
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit  {

  @Input() src:any;
  @Output() onVideoEnd: EventEmitter<any> = new EventEmitter();

  videoPlayer!: VgApiService;

  constructor() { }

  ngOnInit(): void {
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
  }

  initVdo() {
    this.videoPlayer.play();
  }

  handleVideoWatched() {
    this.onVideoEnd.emit();
  }

}
