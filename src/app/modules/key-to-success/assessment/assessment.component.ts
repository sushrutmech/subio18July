import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';
import { AssessmentQuestion } from 'src/app/shared/interfaces/assessment-question';
import { SuccessGoal } from 'src/app/shared/interfaces/success-goal';
import { KeyToSuccessService } from '../key-to-success.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  selectedSuccessGoalId: number = 0;
  selectedSuccessGoal!: SuccessGoal;
  assessmentData!: AssessmentQuestion;
  percentage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private myKeysToSuccessService: KeyToSuccessService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.checkUrlAndData();
    this.getQuestionList();
    console.log("**++--" ,  this.myKeysToSuccessService.getGoalDetailsByID(this.selectedSuccessGoalId).subscribe(
      result => {console.log(result) }))
  }

  checkUrlAndData() {
    this.route.params.subscribe((params: any) => {
      this.selectedSuccessGoalId = +params['goal-id'];
      this.selectedSuccessGoal = history.state.goal_data as SuccessGoal;
      this.checkAndMapSuccessGoalData();
    });
  }

  checkAndMapSuccessGoalData() {
    if (this.selectedSuccessGoalId !== 0 && !this.selectedSuccessGoal) {
      this.getSuccessGoalBySelectedGoalId();
    }
  }

  getSuccessGoalBySelectedGoalId() {
    this.spinner.show();
    this.myKeysToSuccessService.getGoalDetailsByID(this.selectedSuccessGoalId).subscribe(result => {
      this.selectedSuccessGoal = result;
      this.spinner.hide();
    });
  }

  getQuestionList() {
    this.spinner.show();
    this.myKeysToSuccessService.getQuestionList(1).subscribe(results => {
      this.assessmentData = results;
      this.spinner.hide();
    })
  }

  handleProgressChange(value: number) {
    this.percentage = value;
  }

  handleCloseAssessmentForm() {
    this.router.navigate(['key-to-success']);
  }

}
