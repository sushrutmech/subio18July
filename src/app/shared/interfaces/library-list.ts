// export interface HomeContent {
//   userProgramContent: UserProgramContent[];
//   userProgramInstance: UserProgramInstance[];
// }

export interface LibraryListInstance {
  contentID: number;
  author: string;
  avgRating: number;
  contentImage: string;
  contentLocation: string;
  contentBlurb: string;
  contentName: string;
  dateRead: string;
  list: string;
  statusName: string;
  isLiked: boolean;
  rating: number;
  review: string;
  timetoViewDescription: string;
  contentTypeName: string;
}

export interface SearchLibrary {
  contentID: number;
  author: string;
  avgRating: number;
  contentImage: string;
  tagList: string;
  contentName: string;
  contentBlurb: string;
  isRead: boolean;
  rating: number;
  isLiked: boolean;
  review: string;
  timetoViewDescription: string;
  contentLocation: string;
  contentTypeName: string;
}