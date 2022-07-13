import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/appServices/auth.service';
import { AssessmentQuestion } from 'src/app/shared/interfaces/assessment-question';
import { GoalType } from 'src/app/shared/interfaces/goal-type';
import { SuccessGoal } from 'src/app/shared/interfaces/success-goal';
import { SuccessKey } from 'src/app/shared/interfaces/success-key';
import { User } from 'src/app/shared/interfaces/user';
import { AssessmentRequest } from 'src/app/shared/requests/assessment-request';
import { SuccessGoalRequest } from 'src/app/shared/requests/success-goal-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyToSuccessService {
 
  userSession!: User;
  constructor(
    private http:HttpClient,
    private authService: AuthService

  ) { 
    this.userSession = this.authService.userSession.user;
  }

  userDetail(){
    return this.userSession
  }

  getGoalList() {
    return this.http.get<SuccessGoal[]>(`${environment.apiEndPoint}/dashboard/goalList?userId=${this.userSession.userID}`);
  }

  getGoalDetailsByID(UserSuccessId: number) {
    return this.http.get<SuccessGoal>(`${environment.apiEndPoint}/dashboard/getGoalDetailbyId?userId=${this.userSession.userID}&UserSuccessId=${UserSuccessId}`);
  }

  getSuccessKeyData(userSuccessID: number) {
    return this.http.post<SuccessKey[]>(`${environment.apiEndPoint}/dashboard/dashboardKey?UserSuccessId=${userSuccessID}`, {});
  }

  getGoalTypeList() {
    return this.http.get<GoalType[]>(`${environment.apiEndPoint}/dashboard/goalTypeList`);
  }

  getQuestionList(assessmentID: number) {
    return this.http.post<AssessmentQuestion>(`${environment.apiEndPoint}/assessment/questionList?assessmentID=${assessmentID}`, {});
  }

  saveSuccessGoal(params: SuccessGoalRequest) {
    return this.http.post<SuccessGoal>(`${environment.apiEndPoint}/assessment/saveAndUpdateUserSuccessGoal`, params);
  }

  saveAssessment(params: AssessmentRequest) {
    return this.http.post<number>(`${environment.apiEndPoint}/assessment/saveUserAssesment`, params);
  }




}
