import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { KeyToSuccessService } from '../../../modules/key-to-success/key-to-success.service'
import { SuccessKey } from "../../../shared/interfaces/success-key"

@Component({
  selector: 'app-success-key-chart',
  templateUrl: './success-key-chart.component.html',
  styleUrls: ['./success-key-chart.component.scss']
})
export class SuccessKeyChartComponent implements OnInit {

  @Input() userSuccessID!: number;
  isDataLoaded: boolean = false;
  keyData:any  = [];

  
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
    private myKeysToSuccessService:KeyToSuccessService ,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:any): void {
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
    })
  }

  mapData() {
    if (this.keyData.length === 0) {
      this.spinner.hide('assessment-key-chart');
      this.isDataLoaded = true;
      return;
    }
    this.keySlide1 = this.keyData.find((x:any) => x.orderNo === 1);
    this.keySlide2 = this.keyData.find((x:any) => x.orderNo === 2);
    this.keySlide3 = this.keyData.find((x:any) => x.orderNo === 3);
    this.keySlide4 = this.keyData.find((x:any) => x.orderNo === 4);
    this.keySlide5 = this.keyData.find((x:any) => x.orderNo === 5);
    this.keySlide6 = this.keyData.find((x:any) => x.orderNo === 6);
    this.keySlide7 = this.keyData.find((x:any) => x.orderNo === 7);
    this.keySlide8 = this.keyData.find((x:any) => x.orderNo === 8);
    this.keySlide9 = this.keyData.find((x:any) => x.orderNo === 9);

    
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
