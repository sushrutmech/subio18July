import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/appServices/auth.service';
import { User } from '../../../shared/interfaces/user'

@Component({
  selector: 'app-adduserinfopopup',
  templateUrl: './adduserinfopopup.component.html',
  styleUrls: ['./adduserinfopopup.component.scss']
})
export class AdduserinfopopupComponent implements OnInit {

  profileForm!: FormGroup;
  submitted = false;
  userDetail!: User;
  userForm!: FormGroup;
  defaultImage!: string;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) {
    this.userDetail = this.authService.userSession.user;
  }

  ngOnInit(): void {
    this.createForm();

    console.log("popup is called ...")
  }

  createForm() {
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

  }

  get formControls() {
    return this.userForm.controls;
  }



  onSubmit() {
    console.log("from submit,,,,,", this.userForm.value);
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

      console.log("callling submit ...", this.userDetail)
      this.authService.updateProfile(this.userDetail).subscribe(result => {
        this.submitted = false;
        //this.toastr.success('Profile updated successfully!');
        this.spinner.hide();
      });

    }

    // this.dialogRef.close({data: '' });
  }

}
