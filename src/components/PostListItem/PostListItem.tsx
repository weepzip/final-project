import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useState } from "react";
import { PostId, selectPostById } from "../../store/posts/selectors";
import s from "./PostListItem.css";
import { IPost } from "../../interfaces/index";
import { Button } from "../Button/Button";
import { deletePost } from "../../store/posts";
import { ButtonTypes } from "../../constants/ButtonTypes";
import { fetchComments } from "../../store/comments/index";
import {
  selectCommentsByPostId,
  selectIsCommentLoading,
} from "../../store/comments/selectors";
import { Comment } from "../Comment/Comment";

interface PostListItemProps {
  postId: PostId;
}

export const PostListItem = ({
  postId,
}: PostListItemProps): JSX.Element | null => {
  const [commentsIsOpened, toggleComments] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => selectPostById(state, { postId }));
  const commentsIsLoading = useAppSelector(selectIsCommentLoading);
  const comments = useAppSelector((state) =>
    selectCommentsByPostId(state, { postId })
  );

  if (!postId || !post) {
    return null;
  }

  const { userId, title } = post as IPost;

  const handleClick = () => {
    toggleComments(!commentsIsOpened);
    dispatch(fetchComments(postId));
  };

  return (
    <div className={s.post}>
      <div className={s.header}>{userId}</div>
      <div className={s.body}>{title}</div>
      <div className={s.footer}>
        <Button onClick={() => {}} className={ButtonTypes.secondary}>
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deletePost(postId))}
          className={ButtonTypes.delete}
        >
          Delete
        </Button>
        <Button className={ButtonTypes.secondary} onClick={handleClick}>
          Comments
        </Button>
      </div>
      <div className={s.comments}>
        {!commentsIsOpened ? null : commentsIsLoading ? (
          <div>Loading...</div>
        ) : !comments?.length ? null : (
          comments.map((comment) =>
            comment ? <Comment key={comment.id} comment={comment} /> : null
          )
        )}
      </div>
    </div>
  );
};
