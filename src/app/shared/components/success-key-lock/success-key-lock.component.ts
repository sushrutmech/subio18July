import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { KeyToSuccessService } from 'src/app/modules/key-to-success/key-to-success.service';

@Component({
  selector: 'app-success-key-lock',
  templateUrl: './success-key-lock.component.html',
  styleUrls: ['./success-key-lock.component.scss']
})
export class SuccessKeyLockComponent implements OnInit {
  

  @Input() userSuccessID!: number;
  isDataLoaded: boolean = false;
  keyData: any = [];


  keySlide1!: any;
  keySlide2!: any;
  keySlide3!: any;
  keySlide4!: any;
  keySlide5!: any;
  keySlide6!: any;
  keySlide7!: any;
  keySlide8!: any;
  keySlide9!: any;

  constructor(
    private myKeysToSuccessService: KeyToSuccessService,
    private spinner: NgxSpinnerService,
  ) {
    //this.mapLockData()
  }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: any): void {
    if (changes.userSuccessID && changes.userSuccessID.currentValue) {
      this.userSuccessID = changes.userSuccessID.currentValue;
      this.getKeyChartData();
    }
  }

  getKeyChartData() {
    this.spinner.show('assessment-key-chart');
    this.isDataLoaded = false;
    this.myKeysToSuccessService.getSuccessKeyData(this.userSuccessID).subscribe(results => {
      this.keyData = results;
      this.mapData();
      this.mapLockData()
    })
  }

  mapLockData(){
    if (this.keyData.length === 0) {
      this.spinner.hide('assessment-key-chart');
      this.isDataLoaded = true;
      return;
    }
    //console.log("***" , this.keyData)

    
      //key Starts
  
      // circle1
  
      let sec = document.getElementById('seconds')
      let ss = document.getElementById('ss')
      let indicator1 = document.getElementById('circleIndicator')
      let s = this.keyData[0].scorePC
  
      sec!.innerHTML = String(s);
  
      ss!.style.strokeDashoffset = String(251 - (251 * s) / 100);
      ((251 - (251 * s) / 100) / 251) * 100 > 60 ? ss!.style.stroke = "#DC3545" : ((251 - (251 * s) / 100) / 251) * 100 > 30 ? ss!.style.stroke = "#FFC107" : ss!.style.stroke = "#198754";
      ((251 - (251 * s) / 100) / 251) * 100 > 60 ? indicator1!.style.fill = "#DC3545" : ((251 - (251 * s) / 100) / 251) * 100 > 30 ? indicator1!.style.fill = "#FFC107" : indicator1!.style.fill = "#198754";
  
      //circle2
      let sec1 = document.getElementById('seconds1')
      let ss1 = document.getElementById('ss1')
      let indicator2 = document.getElementById('circle1Indicator')
      let s1 = this.keyData[1].scorePC;
  
      sec1!.innerHTML = String(s1)
  
      ss1!.style.strokeDashoffset = String(251 - (251 * s1) / 100);
      ((251 - (251 * s1) / 100) / 251) * 100 > 60 ? ss1!.style.stroke = "#DC3545" : ((251 - (251 * s1) / 100) / 251) * 100 > 30 ? ss1!.style.stroke = "#FFC107" : ss1!.style.stroke = "#198754";
      ((251 - (251 * s1) / 100) / 251) * 100 > 60 ? indicator2!.style.fill = "#DC3545" : ((251 - (251 * s1) / 100) / 251) * 100 > 30 ? indicator2!.style.fill = "#FFC107" : indicator2!.style.fill = "#198754";
  
      //circle3
      let sec2 = document.getElementById('seconds2')
      let ss2 = document.getElementById('ss2')
      let indicator3 = document.getElementById('circle2Indicator')
      let s2 =  this.keyData[2].scorePC;;
  
      sec2!.innerHTML = String(s2)
  
      ss2!.style.strokeDashoffset = String(251 - (251 * s2) / 100);
      ((251 - (251 * s2) / 100) / 251) * 100 > 60 ? ss2!.style.stroke = "#DC3545" : ((251 - (251 * s2) / 100) / 251) * 100 > 30 ? ss2!.style.stroke = "#FFC107" : ss2!.style.stroke = "#198754";
      ((251 - (251 * s2) / 100) / 251) * 100 > 60 ? indicator3!.style.fill = "#DC3545" : ((251 - (251 * s2) / 100) / 251) * 100 > 30 ? indicator3!.style.fill = "#FFC107" : indicator3!.style.fill = "#198754";
  
      //circle4
      let sec3 = document.getElementById('seconds3')
      let ss3 = document.getElementById('ss3')
      let indicator4 = document.getElementById('circle3Indicator')
      let s3 =  this.keyData[3].scorePC;
  
      sec3!.innerHTML = String(s3)
  
      ss3!.style.strokeDashoffset = String(251 - (251 * s3) / 100);
      ((251 - (251 * s3) / 100) / 251) * 100 > 60 ? ss3!.style.stroke = "#DC3545" : ((251 - (251 * s3) / 100) / 251) * 100 > 30 ? ss3!.style.stroke = "#FFC107" : ss3!.style.stroke = "#198754";
      ((251 - (251 * s3) / 100) / 251) * 100 > 60 ? indicator4!.style.fill = "#DC3545" : ((251 - (251 * s3) / 100) / 251) * 100 > 30 ? indicator4!.style.fill = "#FFC107" : indicator4!.style.fill = "#198754";
  
      //circle5
      let sec4 = document.getElementById('seconds4')
      let ss4 = document.getElementById('ss4')
      let indicator5 = document.getElementById('circle4Indicator')
      let s4 =  this.keyData[4].scorePC;;
  
      sec4!.innerHTML = String(s4)
  
      ss4!.style.strokeDashoffset = String(251 - (251 * s4) / 100);
      ((251 - (251 * s4) / 100) / 251) * 100 > 60 ? ss4!.style.stroke = "#DC3545" : ((251 - (251 * s4) / 100) / 251) * 100 > 30 ? ss4!.style.stroke = "#FFC107" : ss4!.style.stroke = "#198754";
      ((251 - (251 * s4) / 100) / 251) * 100 > 60 ? indicator5!.style.fill = "#DC3545" : ((251 - (251 * s4) / 100) / 251) * 100 > 30 ? indicator5!.style.fill = "#FFC107" : indicator5!.style.fill = "#198754";
  
      //circle6
      let sec5 = document.getElementById('seconds5')
      let ss5 = document.getElementById('ss5')
      let indicator6 = document.getElementById('circle5Indicator')
      let s5 =  this.keyData[5].scorePC;

      sec5!.innerHTML = String(s5)
  
      ss5!.style.strokeDashoffset = String(251 - (251 * s5) / 100);
      ((251 - (251 * s5) / 100) / 251) * 100 > 60 ? ss5!.style.stroke = "#DC3545" : ((251 - (251 * s5) / 100) / 251) * 100 > 30 ? ss5!.style.stroke = "#FFC107" : ss5!.style.stroke = "#198754";
      ((251 - (251 * s5) / 100) / 251) * 100 > 60 ? indicator6!.style.fill = "#DC3545" : ((251 - (251 * s5) / 100) / 251) * 100 > 30 ? indicator6!.style.fill = "#FFC107" : indicator6!.style.fill = "#198754";
  
      //circle7
      let sec6 = document.getElementById('seconds6')
      let ss6 = document.getElementById('ss6')
      let indicator7 = document.getElementById('circle6Indicator')
      let s6 =  this.keyData[6].scorePC;
  
      sec6!.innerHTML = String(s6)
  
      ss6!.style.strokeDashoffset = String(251 - (251 * s6) / 100);
      ((251 - (251 * s6) / 100) / 251) * 100 > 60 ? ss6!.style.stroke = "#DC3545" : ((251 - (251 * s6) / 100) / 251) * 100 > 30 ? ss6!.style.stroke = "#FFC107" : ss6!.style.stroke = "#198754";
      ((251 - (251 * s6) / 100) / 251) * 100 > 60 ? indicator7!.style.fill = "#DC3545" : ((251 - (251 * s6) / 100) / 251) * 100 > 30 ? indicator7!.style.fill = "#FFC107" : indicator7!.style.fill = "#198754";
  
  
      //circle8
      let sec7 = document.getElementById('seconds7')
      let ss7 = document.getElementById('ss7')
      let indicator8 = document.getElementById('circle7Indicator')
      let s7 =  this.keyData[7].scorePC;
  
      sec7!.innerHTML = String(s7)
  
      ss7!.style.strokeDashoffset = String(251 - (251 * s7) / 100);
      ((251 - (251 * s7) / 100) / 251) * 100 > 60 ? ss7!.style.stroke = "#DC3545" : ((251 - (251 * s7) / 100) / 251) * 100 > 30 ? ss7!.style.stroke = "#FFC107" : ss7!.style.stroke = "#198754";
      ((251 - (251 * s7) / 100) / 251) * 100 > 60 ? indicator8!.style.fill = "#DC3545" : ((251 - (251 * s7) / 100) / 251) * 100 > 30 ? indicator8!.style.fill = "#FFC107" : indicator8!.style.fill = "#198754";
  
      //circle9
      let sec8 = document.getElementById('seconds8')
      let ss8 = document.getElementById('ss8')
      let indicator9 = document.getElementById('circle8Indicator')
      let s8 =  this.keyData[8].scorePC;
  
      sec8!.innerHTML = String(s8)
  
      ss8!.style.strokeDashoffset = String(251 - (251 * s8) / 100);
      ((251 - (251 * s8) / 100) / 251) * 100 > 60 ? ss8!.style.stroke = "#DC3545" : ((251 - (251 * s8) / 100) / 251) * 100 > 30 ? ss8!.style.stroke = "#FFC107" : ss8!.style.stroke = "#198754";
      ((251 - (251 * s8) / 100) / 251) * 100 > 60 ? indicator9!.style.fill = "#DC3545" : ((251 - (251 * s8) / 100) / 251) * 100 > 30 ? indicator9!.style.fill = "#FFC107" : indicator9!.style.fill = "#198754";
  
  
  
      //combined Result Circle
      let secR = document.getElementById('combinedResult')
      let ssR = document.getElementById('overAlls')
      // console.log(((((440 - (440*s)/60)/440)*100)+(((440 - (440*s1)/60)/440)*100))/2)
      let sR = ((s) + (s1) + (s2) + (s3) + (s4) + (s5) + (s6) + (s7) + (s8)) / 9;
      let reverseSr = 100 - sR
      secR!.innerHTML = String(Math.floor(sR))
      ssR!.style.strokeDashoffset = String((565 * reverseSr) / 100);
      sR < 40 ? ssR!.style.stroke = "#DC3545" : sR < 73 ? ssR!.style.stroke = "#FFC107" : ssR!.style.stroke = "#198754";
  
  
      //ends Key
    

   
   

  }

  mapData() {
    if (this.keyData.length === 0) {
      this.spinner.hide('assessment-key-chart');
      this.isDataLoaded = true;
      return;
    }
    this.keySlide1 = this.keyData.find((x: any) => x.orderNo === 1);
    this.keySlide2 = this.keyData.find((x: any) => x.orderNo === 2);
    this.keySlide3 = this.keyData.find((x: any) => x.orderNo === 3);
    this.keySlide4 = this.keyData.find((x: any) => x.orderNo === 4);
    this.keySlide5 = this.keyData.find((x: any) => x.orderNo === 5);
    this.keySlide6 = this.keyData.find((x: any) => x.orderNo === 6);
    this.keySlide7 = this.keyData.find((x: any) => x.orderNo === 7);
    this.keySlide8 = this.keyData.find((x: any) => x.orderNo === 8);
    this.keySlide9 = this.keyData.find((x: any) => x.orderNo === 9);

    this.spinner.hide('assessment-key-chart');
    this.isDataLoaded = true;
  }

  getColorName(color: string) {
    if (color === 'R') return 'red';
    if (color === 'A') return 'orange';
    if (color === 'G') return 'green';
    return "";
  }


}
