import { AfterContentChecked, Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import * as moment from 'moment';
import { AuthService } from '../appServices/auth.service';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit  {

  profileForm!: FormGroup;
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === "month") {
      const date = cellDate.getDate();
      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? "example-custom-date-class" : "";
    }
    return "";
  };
  progress = 0;
  editProfileForm = false;
  userInfo: any;
  submitted = false;
  maxDate: any;
  minDate: any;
  passMatch = false;
  selectedFiles: any;
  profilePic!: any;
  isValidImg = true;
  clicked = 0;



  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.maxDate = this.minDate = new Date();
    //this.getUserInfo();
    //this.showProgress();
  }



  



}
