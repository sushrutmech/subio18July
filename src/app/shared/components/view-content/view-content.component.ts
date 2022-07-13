import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import {ProgramContentTypes } from '../../constants/program-content-types'
import {UserProgramContent } from '../../../shared/interfaces/home-content'
import { LibraryListInstance , SearchLibrary } from '../../../shared/interfaces/library-list'
import { MyLibraryService } from '../../../modules/my-library/my-library.service'


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

  constructor(
    private myLibraryService: MyLibraryService,
    private spinner: NgxSpinnerService,
  ) { }

  isDataLoaded: boolean = false;
  activeIndex: number = -1;
  activeContent!: UserProgramContent;
  visibleWatchNextButton: boolean = false;
  visibleBackToHomeButton: boolean = false;

  contentType = ProgramContentTypes;

  ngOnInit(): void {
    this.handleReadContent();
    console.log("app view content is called ....")
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

}
