import { useAppDispatch, useAppSelector } from "../../hooks";
import React from "react";
import { PostId, selectPostById } from "../../store/posts/selectors";
import s from "./PostListItem.css";
import { IPost } from "../../interfaces/index";
import { Button } from "../Button/Button";
import { deletePost } from "../../store/posts";
import { ButtonTypes } from "../../constants/ButtonTypes";
import { Link } from "react-router-dom";

interface PostListItemProps {
  postId: PostId;
}

export const PostListItem = ({
  postId,
}: PostListItemProps): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => selectPostById(state, { postId }));

  if (!postId || !post) {
    return null;
  }

  const { id, userId, title, body } = post as IPost;

  return (
    <div className={s.post}>
      <div className={s.header}>
        <Link to={`${id}`}>
          <h2>{title}</h2>
        </Link>
      </div>
      <div className={s.body}>
        <p>{body}</p>
      </div>
      <div className={s.footer}>
        <Link to={`${id}/edit`} className={s.link}>
          Edit
        </Link>
        <Button
          onClick={() => dispatch(deletePost(postId))}
          className={ButtonTypes.delete}
        >
          Delete
        </Button>
        {/* <Button className={ButtonTypes.secondary} onClick={handleClick}>
          Comments
        </Button> */}
      </div>
    </div>
  );
};
