import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/appModels/user.model';
import { AuthService } from 'src/app/appServices/auth.service';
import { AdduserinfopopupComponent } from '../adduserinfopopup/adduserinfopopup.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  
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

  userDetail!: any ;
  defaultImage!: string;
  userForm: FormGroup = new FormGroup({});;

  progress = 80;
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
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
    
  ) {
    this.userDetail = this.authService.userSession.user;
   }

  ngOnInit() {
    this.maxDate = this.minDate = new Date();
    
    this.showProgress();
    this.initializeForm();
    console.log("test 3 is calling ")
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.userDetail.firstName, Validators.required],
      lastName: [this.userDetail.lastName, Validators.required],
      preferredName: [this.userDetail.preferredName, Validators.required],
      jobTitle: [this.userDetail.jobTitle],
      contactNumber: [this.userDetail.contactNumber],
      emailAddress: [this.userDetail.emailAddress]
    });
    //this.userForm.get('emailAddress').disable();
    this.defaultImage = this.userDetail.profilePic;
    console.log("profile image " , this.userDetail.profilePic)
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.spinner.show();
      this.userDetail.firstName = this.userForm.value.firstName;
      this.userDetail.lastName = this.userForm.value.lastName;
      this.userDetail.preferredName = this.userForm.value.preferredName;
      this.userDetail.jobTitle = this.userForm.value.jobTitle || '';
      this.userDetail.contactNumber = this.userForm.value.contactNumber || '';
      this.userDetail.emailAddress = this.userForm.value.emailAddress;
      this.userDetail.profilePic = this.defaultImage;

      this.authService.updateProfile(this.userDetail).subscribe(result => {
        this.submitted = false;
        //this.toastr.success('Profile updated successfully!');
        this.spinner.hide();
      });
    }
  }
 
  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        let dataURL = event.target.result.toString();
        dataURL = dataURL.replace(/data:image\/[a-z]*;base64,/g, "");
        this.defaultImage = dataURL;
      }
    }
  }

  openEditPopup(name: any) {
    const dialogRef = this.dialog.open(AdduserinfopopupComponent, {
      data: {
        userObj: this.userInfo,
        activeFieldName: name
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.showProgress();
    });
  }

  

 

  cancelEdit() {  
    this.editProfileForm = false;
  }

  showProgress() {
    this.progress = 55;
    // if (this.userInfo.email.length !== 0) {
    //   this.progress = this.progress + 15;
    // }
    // if (this.userInfo.mobile.length !== 0) {
    //   this.progress = this.progress + 15;
    // }
    // if (this.profilePic !== undefined) {
    //   this.progress = this.progress + 20;
    // }
    // if (this.userInfo.firstName.length !== 0, this.userInfo.lastName.length !== 0, this.userInfo.middleName.length !== 0) {
    //   this.progress = this.progress + 30;
    // }
    // if (this.userInfo.dateOfBirth !== null) {
    //   this.progress = this.progress + 10;
    // }
    // if (this.userInfo.gender !== null) {
    //   this.progress = this.progress + 10;
    // }
  }

  onSubmit() {
    // this.submitted = true;
    // const userId = this.authService.getUserId();
    // this.authService.updateUser(userId, this.profileForm.value, this.selectedFiles)
    //   .subscribe({
    //     next: (res:any) => {
    //       if (res.TYPE !== "error") {
    //         this.profilePic = res.result.image_name;
    //         localStorage.setItem("authUser", JSON.stringify(res.result));
    //         this.openSnackBar("Update Successful", "Success", true);
    //         this.getUserInfo();
    //         this.editProfileForm = false;
    //       } else {
    //         this.openSnackBar(res.MESSAGE, "Danger", false);
    //       }
    //     },
    //     error: (error) => {
    //       this.openSnackBar(error, "Danger", false);
    //     },
    //   });
  }

  openSnackBar(message: string, action: string, status: boolean) {
    // this._snackBar.open(message, action, {
    //   duration: 3000,
    //   panelClass: status === true ? ["success-snackbar"] : ["danger-snackbar"],
    // });
  }

  selectFiles(event: any) {
    this.selectedFiles = event.target.files;
    const file: File = event.target.files[0];
    if (
      file.type == 'image/png' ||
      file.type == 'image/jpeg' ||
      file.type == 'image/x-png'
    ) {
      this.isValidImg = true;
    } else {
      this.isValidImg = false;
    }

    // const userId = this.authService.getUserId();
    // this.authService.updateProfile(userId, this.selectedFiles).subscribe({
    //   next: (res: any) => {
    //     if (res.status !== "error") {
    //       this.profilePic = res.image_name;
    //       localStorage.setItem("authUser", JSON.stringify(res.result));
    //       this.openSnackBar(res.response, "Success", true);
    //       this.getUserInfo();
    //       this.editProfileForm = false;
    //       this.showProgress();
    //     } else {
    //       this.openSnackBar(res.response, "Danger", false);
    //     }
  //     },
  //     error: (error:any) => {
  //       this.openSnackBar(error, "Danger", false);
  //     }
  //   })
  // }

  // selectedTab(i: number) {
  //   this.clicked = i;
  // }

 

  //addTravellerPopup(traveller?: any) {
    // const dialogRef = this.dialog.open(AddTravellerComponent, {
    //   data: traveller,
    //   width: '660px'
    // },);
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this.getUserInfo();
    // });
  }

  calculateAge(dob: any) {
    var years = moment().diff(dob, 'years', true);
    return years.toFixed();
  }

 

  logout() {
    //this.authService.doLogout();
   
  }


}
