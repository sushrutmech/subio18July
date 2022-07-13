export interface HomeContent {
  userProgramContent: UserProgramContent[];
  userProgramInstance: UserProgramInstance[];
}

export interface UserProgramInstance {
  attendeeUserID: number;
  attendeeLastName: string;
  attendeeFirstName: string;
  attendeeEmail: string;
  jobTitle: string;
  attendeeContactNumber: string;
  attendeeProfilePic: string;
  userProgramStatusID: number;
  attendeeStatus: string;
  programInstanceID: number;
  programID: number;
  dateStart: string;
  dateEnd: string;
  programName: string;
  programDescription: string;
  programImage: string;
  programStatusID: number;
  programStatusDescription: string;
  tutorName: string;
  tutorEmail: string;
  tutorProfilePic: string;
}

export interface UserProgramContent {
  programID: number;
  userProgramInstanceID: number;
  programInstanceID: number;
  userID: number;
  programStepID: number;
  contentID: number;
  stepNo: number;
  stepName: string;
  contentName: string;
  contentBlurb?: any;
  contentImage: string;
  contentLocation: string;
  programStepImage?: string;
  headerBlurb: string;
  footerBlurb: string;
  readCount: number;
  lastRead: string;
  contenttypeid: number;
  contentTypeName: string;
  nextButtonText: string;
}
