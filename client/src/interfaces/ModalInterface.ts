export interface EditModalPropsInterface {
  setShowModal: React.Dispatch<React.SetStateAction<null | string>>;
  commentId: string;
  authorName: string;
  commentText: string;
  commentDate: string;
  editComment: (id: string, editedComment: string) => Promise<void>;
}
