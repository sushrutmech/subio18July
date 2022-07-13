import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { User } from'../../../shared/interfaces/user'
import {AuthService } from '../../../appServices/auth.service'



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  is_edit : boolean = false;

  userDetail!: User ;
  userForm: FormGroup = new FormGroup({});;
  submitted: boolean = false;
  defaultImage!: string;
  isImageDisabled!: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { 
    console.log("profile calling")
    this.userDetail = this.authService.userSession.user;
   }

  ngOnInit(): void {
    this.initializeForm()
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
  }

  get formControls():any {
    return this.userForm.controls;
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

  onCancelClick() {
    this.userForm.reset({
      firstName: this.userDetail.firstName,
      lastName: this.userDetail.lastName,
      preferredName: this.userDetail.preferredName,
      jobTitle: this.userDetail.jobTitle,
      contactNumber: this.userDetail.contactNumber,
      emailAddress: this.userDetail.emailAddress
    });
    this.defaultImage = this.userDetail.profilePic;
    this.submitted = false;
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

}
