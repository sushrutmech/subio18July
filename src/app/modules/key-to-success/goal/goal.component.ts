import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, RouteConfigLoadStart, Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';
import { GoalType } from 'src/app/shared/interfaces/goal-type';
import { SuccessGoal } from 'src/app/shared/interfaces/success-goal';
import { User } from 'src/app/shared/interfaces/user';
import { KeyToSuccessService } from '../key-to-success.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuccessGoalRequest } from 'src/app/shared/requests/success-goal-request';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  selectedSuccessGoalId: number = 0;
  selectedSuccessGoal!: SuccessGoal;
  goalTypeList: GoalType[] = [];
  //goalForm: FormGroup;
  goalForm: FormGroup = new FormGroup({});
  userSession!: User;
  submitted: boolean = false;
  isNewGoal: boolean = false;
  addGoalAssessmentForm=false


  Id:any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private myKeysToSuccessService: KeyToSuccessService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.userSession = this.authService.userSession.user;
  }
  
  ngOnInit(): void {
    this.Id = this.route.snapshot.params
    this.selectedSuccessGoalId = this.Id['goal-id'];
    this.goalForm = this.fb.group({
      userSuccessID: [0, Validators.required],
      userId: [this.userSession.userID, Validators.required],
      successGoalTypeID: [0],
      goal: ['', Validators.required],
      goalDesc: ['']
    })
    //this.getGoalTypeList(() => this.checkUrlAndData());
    this.getGoalTypeList()
    this.getSuccessGoalBySelectedGoalId()
  }

  getGoalTypeList() {
    this.spinner.show();
    this.myKeysToSuccessService.getGoalTypeList().subscribe(results => {
      this.goalTypeList = results;
      //cb && cb();
      this.spinner.hide();
    })
  }

  onGoalTypeClick(item: any) {
    if (item) {
      this.goalTypeList.map(x => { x.isSelected = item.successGoalTypeID === x.successGoalTypeID; });
      this.goalForm.patchValue({ successGoalTypeID: item.successGoalTypeID })
    } else {
      this.goalTypeList.map(x => { x.isSelected = 4 === x.successGoalTypeID; });
      this.goalForm.patchValue({ successGoalTypeID: 4 })
    }
  }

  // checkUrlAndData() {
  //   this.route.params.subscribe((params: Params) => {
  //     this.selectedSuccessGoalId = +params['goal-id'] || 0;
  //     this.selectedSuccessGoal = history.state.goal_data as SuccessGoal;
  //     if (this.selectedSuccessGoalId == 0) {
  //       this.isNewGoal= true;
  //     }
  //     this.checkAndMapSuccessGoalData();
  //   });
  // }

  checkAndMapSuccessGoalData() {
    if (this.selectedSuccessGoalId !== 0 && !this.selectedSuccessGoal) {
      this.getSuccessGoalBySelectedGoalId();
    } else if (this.selectedSuccessGoal) {
      this.onGoalTypeClick(this.goalTypeList.find(x => x.successGoalTypeID === this.selectedSuccessGoal.successGoalTypeId));
      this.patchFormValue();
    }
  }

  getSuccessGoalBySelectedGoalId() {
    this.spinner.show();
    this.myKeysToSuccessService.getGoalDetailsByID(this.selectedSuccessGoalId).subscribe(result => {
      console.log(result);
      this.selectedSuccessGoal = result;
      this.onGoalTypeClick(this.goalTypeList.find(x => x.successGoalTypeID === this.selectedSuccessGoal.successGoalTypeId))
      this.patchFormValue();
      this.spinner.hide();
    });
  }



  patchFormValue() {
    this.goalForm.patchValue({
      userSuccessID: this.selectedSuccessGoal.userSuccessID,
      userId: this.userSession.userID,
      successGoalTypeID: this.selectedSuccessGoal.successGoalTypeId,
      goal: this.selectedSuccessGoal.goal,
      goalDesc: this.selectedSuccessGoal.goalDescription
    })
  }

  onSubmitGoalForm() {
    this.submitted = true;
    console.log("submit goal is called ")
    if (this.goalForm.valid) {
      var params: SuccessGoalRequest = {
        userSuccessID: this.goalForm.value.userSuccessID,
        successGoalTypeID: this.goalForm.value.successGoalTypeID,
        userId: this.userSession.userID,
        goal: this.goalForm.value.goal,
        goalDesc: this.goalForm.value.goalDesc
      };
      console.log("valuee ", params)

      this.myKeysToSuccessService.saveSuccessGoal(params).subscribe(rows => {
        console.log(rows)
        this.submitted = false;
        this.spinner.hide();
        //this.addGoalAssessmentForm=!this.addGoalAssessmentForm
        this.router.navigate(["key-to-success", 'goal', rows.userSuccessID, 'assessment'],);
      })

    }



  }



}
