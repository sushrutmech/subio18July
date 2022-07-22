import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.scss']
})
export class CommentboxComponent implements OnInit {

  showRepBox:boolean=false;
  replyInput:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  replyCommet(){
    console.log("reply is called ")
    this.showRepBox=true;
    this.replyInput=true;
  }

}
