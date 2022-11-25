import { IComment } from "interfaces";
import React from "react";
import s from "./Comment.css";

interface CommentProps {
  comment: IComment;
}

export const Comment = ({ comment }: CommentProps): JSX.Element | null => {
  if (!comment) {
    return null;
  }
  return (
    <div className={s.comment}>
      <div className={s.header}>{comment.name}</div>
      <div className={s.body}>{comment.body}</div>
    </div>
  );
};
