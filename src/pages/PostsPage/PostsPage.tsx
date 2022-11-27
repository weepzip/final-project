import { PostListItem } from "../../components/PostListItem/PostListItem";
import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { fetchPosts } from "../../store/posts/index";
import {
  selectIsPostFetching,
  selectPostsIds,
} from "../../store/posts/selectors";
import s from "./PostsPage.css";
import { NewPost } from "../../components/NewPost/NewPost";

export const PostsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsPostFetching);
  const posts = useAppSelector(selectPostsIds);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!posts) {
    return <div>No posts</div>;
  }

  return (
    <div className={s.posts}>
      <h1>Posts</h1>
      <div className={s.header}>
        <NewPost />
      </div>
      <div className={s.body}>
        {posts.map((postId: string | number) => (
          <PostListItem key={postId} postId={postId} />
        ))}
      </div>
    </div>
  );
};
