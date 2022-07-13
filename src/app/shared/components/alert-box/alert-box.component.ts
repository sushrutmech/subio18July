import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit , OnChanges {

  @Input() resData: any
  alertContaian: any;
  tesst:any="eamiln and pads"



  constructor() {
   
   }

  ngOnInit(): void {
    console.log("llll" , this.resData , this.resData.error.errorMessage )
    console.log( "/*/*",this.setErrorMsg()) 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("**++" , changes)
    if(changes['resData'].firstChange) return;
    this.setErrorMsg()
    
  }

  setErrorMsg( params:any=this.resData ){
    return this.alertContaian= params.error.errorMessage
  }

  
  
 

 


}
