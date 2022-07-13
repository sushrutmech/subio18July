export interface AssessmentQuestion {
  assessmentID: number;
  assessmentName: string;
  introduction: string;
  introductionBody: string;
  ending: string;
  endingBody: string;
  questionList: QuestionList[];
}

export class QuestionList {
  assessmentID!: number;
  assessmentName!: string;
  questionTypeID!: number;
  assessmentQuestionID!: number;
  questionTypeName!: string;
  questionText!: string;
  maximumText!: string;
  minimumText!: string;
  maximumValue!: number;
  minimumValue!: number;
  valueStep!: number;
  questionWeighting!: number;
  thisOrderNo!: number;
  //Not Mapped
  selectedValue!: number;
}
