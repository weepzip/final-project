import { Comment } from "../Comment/Comment";
import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { fetchComments } from "../../store/comments";
import {
  selectCommentsIds,
  selectIsCommentLoading,
  selectRawComments,
} from "../../store/comments/selectors";
import s from "./CommentsBlock.css";

interface CommentsBlockProps {
  postId: string | number;
}
export const CommentsBlock = ({
  postId,
}: CommentsBlockProps): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const commentsIds = useAppSelector((state) => selectCommentsIds(state));
  const isLoading = useAppSelector(selectIsCommentLoading);
  const rawComments = useAppSelector(selectRawComments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.comments_block}>
      <h2>Comments</h2>
      {/* {commentsIds.map((id) => (
        <Comment key={id} commentId={id} />
      ))} */}
      {rawComments.map((comment) => {
        return (
          <>
            <Comment key={comment.id} commentId={comment.id} />
            <div>{comment.reply?.join(", ")}</div>
            {comment.reply?.length ? (
              <div className={s.comments_block}>
                {comment.reply.map((id) => (
                  <Comment commentId={id} reply={true} />
                ))}
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};
