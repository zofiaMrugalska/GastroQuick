export interface Author {
  _id: string;
  name: string;
}

export interface CommentRequestInterface {
  _id: string;
  author: Author;
  comment: string;
  createdAt: string;
}

export interface ResponseCommentInterafce {
  data: CommentRequestInterface[];
  message: string;
  success: boolean;
}
