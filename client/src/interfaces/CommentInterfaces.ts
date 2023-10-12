export interface CommentRequestInterface {
  _id: string;
  comment: string;
}

export interface ResponseCommentInterafce {
  data: CommentRequestInterface[];
  message: string;
  success: boolean;
}
