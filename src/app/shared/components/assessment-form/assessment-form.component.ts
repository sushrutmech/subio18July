import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AssessmentQuestion, QuestionList } from '../../interfaces/assessment-question';
import { SuccessGoal } from '../../interfaces/success-goal';
import { AssessmentRequest } from '../../requests/assessment-request';
import { NgxSpinnerService } from 'ngx-spinner';
import { KeyToSuccessService } from '../../../modules/key-to-success/key-to-success.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css'],

})
export class AssessmentFormComponent implements OnInit {

  @Input() assessmentData!: AssessmentQuestion;
  @Input() successGoal!: SuccessGoal;
  @Output() onRequestClose: EventEmitter<any> = new EventEmitter();
  @Output() progressChange: EventEmitter<number> = new EventEmitter();

  currentPage: number = 1;
  totalPages: number = 0;
  questionList!: QuestionList[];
  introVisible: boolean = true;
  formVisible: boolean = false;
  finishVisible: boolean = false;
  submitted: boolean = false;
  isDataLoaded: boolean = false;
  precentage: number = 0;


  formParams: AssessmentRequest = { userId: 0, userSuccessID: 0, answerList: [] };

  constructor(
    private myKeysToSuccessService: KeyToSuccessService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get showCancelButton() {
    return !this.isLastPage;
  }

  get isFirstPage() {
    return this.currentPage === 1;
  }

  get isLastPage() {
    return this.currentPage === this.totalPages;
  }

  get questionText() {
    var sliceCount = this.assessmentData.questionList.slice((this.currentPage - 1) * 10, this.currentPage * 10).length;
    var currentFirstCount = (this.currentPage - 1) * 10;
    return `${currentFirstCount + 1} to ${currentFirstCount + sliceCount}`;
  }

  ngOnChanges(changes: any): void {
    if (changes.assessmentData && changes.assessmentData.currentValue) {
      this.assessmentData = changes.assessmentData.currentValue;
      this.questionList = this.assessmentData.questionList;
      this.totalPages = Math.ceil(this.questionList.length / 10);
      this.formParams.answerList = this.questionList.map(x => {
        return {
          assessmentQuestionId: x.assessmentQuestionID,
          answer: 0
        }
      });
    }
    if (changes.successGoal && changes.successGoal.currentValue) {
      this.successGoal = changes.successGoal.currentValue;
      this.formParams.userId = this.successGoal.userID;
      this.formParams.userSuccessID = this.successGoal.userSuccessID;
      if (this.successGoal.lastAssessmentTaken !== "0001-01-01T00:00:00") {
        this.onStartClick();
      }
      this.isDataLoaded = true;
    }
  }

  eventHandler(event: KeyboardEvent, item: QuestionList) {
    switch (event.code) {
      case "Numpad1":
        if (item.maximumValue >= 1) {
          item.selectedValue = 1;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad2":
        if (item.maximumValue >= 2) {
          item.selectedValue = 2;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad3":
        if (item.maximumValue >= 3) {
          item.selectedValue = 3;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad4":
        if (item.maximumValue >= 4) {
          item.selectedValue = 4;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad5":
        if (item.maximumValue >= 5) {
          item.selectedValue = 5;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad6":
        if (item.maximumValue >= 6) {
          item.selectedValue = 6;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad7":
        if (item.maximumValue >= 7) {
          item.selectedValue = 7;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad8":
        if (item.maximumValue >= 8) {
          item.selectedValue = 8;
          this.handleClickOnQuestion(item);
        }
        break;
      case "Numpad9":
        if (item.maximumValue >= 9) {
          item.selectedValue = 9;
          this.handleClickOnQuestion(item);
        }
        break;
      default:
        event.preventDefault();
        break;
    }
  }

  handleClickOnQuestion(question: QuestionList) {
    if (this.isLastPage && question.thisOrderNo === this.questionList.length) {
      this.onFinishClick();
    } else if (question.thisOrderNo % 10 === 0) {
      this.onNextClick();
    }
  }

  handleCancelClick() {
    this.route.navigate(["/key-to-success"])
    this.onRequestClose.emit();
  }

  onStartClick() {
    this.introVisible = false;
    this.formVisible = true;
    this.finishVisible = false;
  }

  onNextClick() {
    if (this.isValidateCurrentQuestions()) {
      this.submitted = false;
      this.currentPage = this.currentPage + 1;
      this.sendPercentage();
    } else {
      this.submitted = true;
    }
  }

  isValidateCurrentQuestions() {
    var questions = this.assessmentData.questionList.slice((this.currentPage - 1) * 10, this.currentPage * 10);
    return !questions.some(x => (x.selectedValue === undefined));
  }

  onPreviousClick() {
    if (this.currentPage !== 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  onFinishClick() {
    if (this.isValidateCurrentQuestions()) {
      this.submitted = false;
      var params = this.getRequestParams();
      this.spinner.show();
      this.myKeysToSuccessService.saveAssessment(params).subscribe(result => {
        this.introVisible = false;
        this.formVisible = false;
        this.finishVisible = true;
        this.precentage = 100;
        this.progressChange.emit(this.precentage);
        this.spinner.hide();
      })
    } else {
      this.submitted = true;
    }
  }

  sendPercentage() {
    var newPrecentage = Math.round(((this.currentPage - 1) * 100) / Math.ceil(this.questionList.length / 10));
    if (this.precentage < newPrecentage) {
      this.precentage = newPrecentage;
      this.progressChange.emit(this.precentage);
    }
  }

  getRequestParams() {
    this.formParams.answerList = this.questionList.map(x => {
      return {
        assessmentQuestionId: x.assessmentQuestionID,
        answer: x.selectedValue
      }
    })
    return this.formParams;
  }

  onShowMeMyKeyClick() {
    this.onRequestClose.emit();
    this.route.navigate(['/key-to-success'])
  }

  starLeave(params:any) {
    console.log("calling .." , params )
  
    document.querySelector('.starr>.active')?.classList.add("sarfraj");
    
    
  }


}
