import { useAppSelector } from "../../hooks";
import React from "react";
import { selectCommentById } from "../../store/comments/selectors";
import s from "./Comment.css";

interface CommentProps {
  commentId: string | number;
  reply?: boolean;
}

export const Comment = ({
  commentId,
  reply = false,
}: CommentProps): JSX.Element | null => {
  const comment = useAppSelector((state) =>
    selectCommentById(state, { commentId })
  );

  if (!comment) {
    return null;
  }

  return (
    <div className={`${s.comment} ${reply ? s.replied : ""}`}>
      <div className={s.header}>
        <h3>{comment.name}</h3>
      </div>
      <div className={s.body}>{comment.body}</div>
      <div className={s.footer}></div>
    </div>
  );
};
