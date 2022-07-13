export interface AssessmentRequest {
    userSuccessID: number;
    userId: number;
    answerList: AnswerListRequest[];
}

export interface AnswerListRequest {
    assessmentQuestionId: number;
    answer: number;
}