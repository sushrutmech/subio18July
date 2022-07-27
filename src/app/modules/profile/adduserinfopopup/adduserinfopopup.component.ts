import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adduserinfopopup',
  templateUrl: './adduserinfopopup.component.html',
  styleUrls: ['./adduserinfopopup.component.scss']
})
export class AdduserinfopopupComponent implements OnInit {

  profileForm!: FormGroup;
  submitted = false;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.profileForm = new FormGroup({
      prefix: new FormControl(""),
      firstName: new FormControl(""),
      middleName: new FormControl(""),
      lastName: new FormControl(""),
      gender: new FormControl(""),
      maritalStatus: new FormControl(""),
      dateOfBirth: new FormControl("")
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.submitted = true;
    
    // this.dialogRef.close({data: '' });
  }

}
