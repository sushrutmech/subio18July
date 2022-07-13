import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { ChangePasswordRequest } from '../../../shared/interfaces/change-password.request'
import { User } from '../../../shared/interfaces/user'
import { MustMatch } from '../../../shared/utils/formValidators.util'
import { AuthService } from '../../../appServices/auth.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm:FormGroup= new FormGroup({});
  userSession!: User;
  submitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,

  ) {
    this.userSession = authService.userSession.user;
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: MustMatch });
   }

  ngOnInit(): void {

  }

  get formControls():any {
    return this.changePasswordForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.spinner.show();
      let req: ChangePasswordRequest = {
        user_id: this.userSession.userID,
        oldpassword: this.changePasswordForm.value.oldPassword,
        newpassword: this.changePasswordForm.value.password

      }
      this.authService.changePassword(req).subscribe(result => {
        this.submitted = false;
        this.changePasswordForm.reset();
        this.spinner.hide();
        alert("password change successfully........")
        //this.toastr.success('Password changed successfully!');

      },err=>{
        this.spinner.hide()
        alert(  err.error.errorMessage)
        //console.log(err , err.error.errorMessage)
      });
    }
  }





}
