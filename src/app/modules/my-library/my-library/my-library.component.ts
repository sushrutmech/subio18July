import { Component, OnInit } from '@angular/core';

import { LibraryListInstance , SearchLibrary } from '../../../shared/interfaces/library-list'
import { MyLibraryService } from '../my-library.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent implements OnInit {

  rate = 4;
  suggestedList:any =[];
  readingList:any=[];
  readingHistory:any=[];
  excludeSwitch: boolean = false;

  searchResult:any = [];
  isWatchVideo!: boolean;
  selectedContent!: any;
  isDataLoaded: boolean = false;
  hasData: boolean = false;

  searchForm!: FormGroup;
  isSearched: boolean = false;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  

  constructor(
    private myLibraryService: MyLibraryService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: '',
      excludeSwitch: false
    })
    this.getAllContent();


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

  addToReadingList(contentId:any) {
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
    
      this.myLibraryService.searchTerm(this.searchForm.value.searchInput, this.searchForm.value.excludeSwitch).subscribe((result:any) => {
        this.isSearched = true;
        this.searchResult = result;
        console.log("search result" , this.searchResult)
        this.spinner.hide();
      })
    }

  }

  handleWatchVideo(data:any = null) {
    this.selectedContent = data;
    this.isWatchVideo = true;
  }

  handleContentViewerClose(ev:any) {
    if (ev) {
      this.getAllContent();
      this.searchTerm()
    }
    this.selectedContent = null;
    this.isWatchVideo = false;
  }





}
