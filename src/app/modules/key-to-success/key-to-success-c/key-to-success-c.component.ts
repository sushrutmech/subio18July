import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { SuccessGoal } from 'src/app/shared/interfaces/success-goal';
import { KeyToSuccessService } from 'src/app/modules/key-to-success/key-to-success.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/appServices/auth.service';


@Component({
  selector: 'app-key-to-success-c',
  templateUrl: './key-to-success-c.component.html',
  styleUrls: ['./key-to-success-c.component.css']
})
export class KeyToSuccessCComponent implements OnInit,DoCheck {
  [x: string]: any;

  isDataLoaded: boolean = false;
  successGoalList: SuccessGoal[] = [];
  selectedSuccessGoal!: SuccessGoal;

  isUrlLib: boolean = false;

  allGoalData: any
  teamGoalList: any = []
  MyGoalList: any = []
  BusinessGoalList: any = []


  //tab index from tab container 
  @Input() tabIndex: number = 0


  constructor(
    private myKeysToSuccessService: KeyToSuccessService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {
    // console.log("keyto c is loaded" ,this.myKeysToSuccessService.getGoalList())

  }

  ngOnInit(): void {
    
    this.getSuccessGoalList();
    
  }

  getSuccessGoalList() {
    this.spinner.show();
    this.myKeysToSuccessService.getGoalList().subscribe(results => {

      if (results.length > 0) {
        //console.log(this.tabIndex)
        this.successGoalList = results;
        switch (this.tabIndex) {

          case 0: this.selectedSuccessGoal = this.successGoalList[0]; break;
          case 1: this.filterGoalist(results, 1); break;
          case 2: this.filterGoalist(results, 3); break;
          case 3: this.filterGoalist(results, 2); break;
        }

      
       
      
      }
      this.isDataLoaded = true;
      this.spinner.hide();
    });
  }

  filterGoalist(data: any, goalTypeId: number) {

    let filterData = data.filter((ele: any) => {
      return ele.successGoalTypeId == goalTypeId;
    })

    this.selectedSuccessGoal = filterData[0];

    //this.getSuccessGoalList=filterData;
    //console.log(filterData)
    

  }


  getTeamGoakList() {
    //this.spinner.show();
    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results

      console.log("**++--//", this.allGoalData)

      this.teamGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/UExURQAAAN/f397e3tfX19jY2Nra2tnZ2dfX19nZ2djY2NfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2d4gwvcAAAAUdFJOUwAQHyAuMD1AUFtgcICPn6+/z9/vYpxEMwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAUNJREFUOE/tk8lyxCAMRK04BDJsBvT/35rWgjM19ySXdM3hldRAIzPHn4lSdAr5NKD4MLh1TuahlBezdqkzr6C1LVSYM4BgYibQQ6Brd+uSUgWQAMuZRcD238pS0mQDMAVOKRWhb5U55EA0+7osfhqryNFPouA3AzkctEuu0CV0xcooJw5ckqqUfFuVFqD1Vg242V0hywElL3DVe6na9vMOcPeSDkS17qX7mhdLGOgdkRTgBhstM2GQttvA+qbUJ2fzo+NzwVFaqZ2H+XuVnyju/I1H0EqaO39PvD6VwvRviZ65PmB0F1JEnUWoHmxyNBfxJHfhRpYiBHfhk5irhOBTwSHRCL17/OZi0O06bPjPzxCughmACk/MwFwNS15cJ3KACh5ec9cDT+zf9dMuKoXOLM8tlnzEnEClBMr55W/7SzqOL4sFKnpMQsP8AAAAAElFTkSuQmCC" }
      )

      console.log("**++--//filterTeamGoal", this.teamGoalList)

    })

    return this.teamGoalList

  }

  getMyGoalList() {
    this.myKeysToSuccessService.getGoalList().subscribe(results => {
      this.allGoalData = results

      console.log("**++--//", this.allGoalData)

      this.MyGoalList = this.allGoalData.filter(
        (ele: any) => { return ele.icon == "iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAMAAAAZd2syAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURQAAAN/f39fX19ra2tfX19nZ2dfX19jY2NfX19ra2tra2tnZ2dra2tnZ2dnZ2dnZ2dnZ2VMHktcAAAAQdFJOUwAQIDBAUGBwgI+fr7/P3+8jGoKKAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABUUlEQVQ4T9VT3daEIAgU0yzzh/d/2m8gas09u9/1zkVHbGAGKPeDoLR5O35DYebFzp+xgMWbBZ9BQlstmBD2fPsJre/kVJae4r4zdzsDFHOVinRwsitFEqFgQahIEuRjUhfb3VRXI6GetUJRnstKbq1VziHGrXNTWoLEWStxwQPZZVfFqO+bhxjzcTcAray2BMgkqVO8WyUeWtolvhy/mtfR8bAxLKaeUhCDV5t+lnjYBOVCKtvxPIclt2pu2oQZ1gEUwkXQVrscXyC1Fp0HSewRDHekTttXa5p69rDBbtjuaV/Q7psFwC45jbOFF87u6204ycQqzE4QFRDVPQATHiWH+obKbQFxPyNUD0gdlmDAzlZwLzfYupR8zkPQUKnctILpIPP54QK4iwNNB1PngWhvNNIU75qHdD/T3oBt4cv9l+Z1MaFfv8wnpMdf9jtw7g+gCBMfF5RfCQAAAABJRU5ErkJggg==" }
      )

      console.log("**++--//filterMyGoalList", this.MyGoalList)

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

     // console.log("**++--//filterBuinessGoalList", this.BusinessGoalList)

    })

    return this.BusinessGoalList



  }


  setSuccessGoal(item: SuccessGoal) {
    this.selectedSuccessGoal = item;
  }

  ngDoCheck() {   
    let url = window.location.href;
    this.isUrlLib = url.includes("key-to-success");
  }
}

