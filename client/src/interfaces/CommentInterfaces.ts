export interface Author {
  _id: string;
  name: string;
}

export interface CommentRequestInterface {
  _id: string;
  author: Author;
  comment: string;
  createdAt: Date;
}

export interface ResponseCommentInterafce {
  data: CommentRequestInterface[];
  message: string;
  success: boolean;
}
