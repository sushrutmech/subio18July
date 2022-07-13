import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuccessGoal } from 'src/app/shared/interfaces/success-goal';
import { KeyToSuccessService } from "../../../modules/key-to-success/key-to-success.service"
import { KeyToSuccessCComponent } from '../../key-to-success/key-to-success-c/key-to-success-c.component';

@Component({
  selector: 'app-key-success-container',
  templateUrl: './key-success-container.component.html',
  styleUrls: ['./key-success-container.component.scss'],
 
})
export class KeySuccessContainerComponent implements OnInit , AfterViewInit {

  @ViewChild(KeyToSuccessCComponent) child!:KeyToSuccessCComponent;


  isDataLoaded: boolean = false;
  successGoalList: SuccessGoal[] = [];
  selectedSuccessGoal!: SuccessGoal;
  addGoalForm=false

  i!: number
  allGoalData: any

  teamGoalList: any = []
  MyGoalList: any = []
  BusinessGoalList: any = []

  tabIndex!:number


  teamGoalIcon: any = "iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA"

  constructor(
    private spinner: NgxSpinnerService,
    private myKeysToSuccessService: KeyToSuccessService,


  ) {
    // console.log("****", this.getSuccessGoalList())
    // this.myKeysToSuccessService.getGoalList().subscribe(results => { console.log(results) })

  }

  ngOnInit(): void {
    
    

    this.getSuccessGoalList();
    this.getBusinessGoalList();
    this.getMyGoalList();
    this.getTeamGoakList();

    this.child.getSuccessGoalList();

    
  }

  addGoalFun(){
    this.addGoalForm = !this.addGoalForm
  }


  ngAfterViewInit() {
    // child is set
    this.child.getBusinessGoalList();
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

      //console.log("**++--//", this.allGoalData)

      this.teamGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/UExURQAAAN/f397e3tfX19jY2Nra2tnZ2dfX19nZ2djY2NfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2d4gwvcAAAAUdFJOUwAQHyAuMD1AUFtgcICPn6+/z9/vYpxEMwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAUNJREFUOE/tk8lyxCAMRK04BDJsBvT/35rWgjM19ySXdM3hldRAIzPHn4lSdAr5NKD4MLh1TuahlBezdqkzr6C1LVSYM4BgYibQQ6Brd+uSUgWQAMuZRcD238pS0mQDMAVOKRWhb5U55EA0+7osfhqryNFPouA3AzkctEuu0CV0xcooJw5ckqqUfFuVFqD1Vg242V0hywElL3DVe6na9vMOcPeSDkS17qX7mhdLGOgdkRTgBhstM2GQttvA+qbUJ2fzo+NzwVFaqZ2H+XuVnyju/I1H0EqaO39PvD6VwvRviZ65PmB0F1JEnUWoHmxyNBfxJHfhRpYiBHfhk5irhOBTwSHRCL17/OZi0O06bPjPzxCughmACk/MwFwNS15cJ3KACh5ec9cDT+zf9dMuKoXOLM8tlnzEnEClBMr55W/7SzqOL4sFKnpMQsP8AAAAAElFTkSuQmCC" }
      )

      //console.log("**++--//filterTeamGoal", this.teamGoalList)

    })

    return this.teamGoalList

  }

  getMyGoalList() {
    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results

      //console.log("**++--//", this.allGoalData)

      this.MyGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAMAAAAZd2syAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAN/f39fX19ra2tfX19nZ2dfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2VMHktcAAAAQdFJOUwAQIDBAUGBwgI+fr7/P3+8jGoKKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABUUlEQVQ4T9VT3daEIAgU0yzzh/d/2m8gas09u9/1zkVHbGAGKPeDoLR5O35DYebFzp+xgMWbBZ9BQlstmBD2fPsJre/kVJae4r4zdzsDFHOVinRwsitFEqFgQahIEuRjUhfb3VRXI6GetUJRnstKbq1VziHGrXNTWoLEWStxwQPZZVfFqO+bhxjzcTcAray2BMgkqVO8WyUeWtolvhy/mtfR8bAxLKaeUhCDV5t+lnjYBOVCKtvxPIclt2pu2oQZ1gEUwkXQVrscXyC1Fp0HSewRDHekTttXa5p69rDBbtjuaV/Q7psFwC45jbOFF87u6204ycQqzE4QFRDVPQATHiWH+obKbQFxPyNUD0gdlmDAzlZwLzfYupR8zkPQUKnctILpIPP54QK4iwNNB1PngWhvNNIU75qHdD/T3oBt4cv9l+Z1MaFfv8wnpMdf9jtw7g+gCBMfF5RfCQAAAABJRU5ErkJggg==" }
      )

     // console.log("**++--//filterMyGoalList", this.MyGoalList)

    })

    return this.MyGoalList

  }


  getBusinessGoalList() {

    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results

     

      this.BusinessGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAMAAAAZd2syAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAN/f39fX19ra2tfX19nZ2dfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2VMHktcAAAAQdFJOUwAQIDBAUGBwgI+fr7/P3+8jGoKKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAj0lEQVQ4T+XRQQ6EIAwF0FJRGUDo/U87k/ZjTECXJmTeqm1+rFaaxxKySTsmI1zllDAb2KV+zCHiMOwFKai8CKPsPcc4YFU+l0aRiHJDijLe+kb7aLR34myxtP0UNKrFliu9KqMxGiJarzTm0aj2O/Bwo8ccLkVrKpNbUZsXDtL7v1hAP1Y8YkTuCTJTI/oCJP0pPY2k3a4AAAAASUVORK5CYII=" }
      )


    })

    return this.BusinessGoalList



  }








  setSuccessGoal(item: SuccessGoal) {
    this.selectedSuccessGoal = item;
    console.log("cki++++++")
  }

  selectedTabChange(event:MatTabChangeEvent){
    console.log(event)
    this.tabIndex=event.index
    this.child.getSuccessGoalList();

  }













}
