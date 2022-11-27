import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { selectIsPostLoading, selectPost } from "../../store/post/selectors";
import { fetchPost } from "../../store/post";
import s from "./Post.css";

interface PostProps {
  postId: string | number;
}

export const Post = ({ postId }: PostProps): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const isLoading = useAppSelector(selectIsPostLoading);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postId || !post) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={s.post}>
      <div className={s.header}>
        <h1>{post.title}</h1>
      </div>
      <div className={s.body}>
        <p>{post.body}</p>
      </div>
      {/* <div className={s.footer}></div> */}
    </div>
  );
};
