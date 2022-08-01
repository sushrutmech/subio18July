import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-on-hover-key',
  templateUrl: './on-hover-key.component.html',
  styleUrls: ['./on-hover-key.component.css']
})
export class OnHoverKeyComponent implements OnInit {
  @Input() userSuccessGoalId:any;
  userSuccessGoalIdDialog:any;
  goalData:any; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userSuccessGoalIdDialog=data.userSuccessGoalId
    this.goalData=data.goalData
   }

  ngOnInit(): void {
    //console.log("*****",this.userSuccessGoalIdDialog )
  }

}
