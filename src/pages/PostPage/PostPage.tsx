import React from "react";
import { Navigate, useParams } from "react-router-dom";
import s from "./PostPage.css";
import { Post } from "../../components/Post/Post";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";

export const PostPage = (): JSX.Element | null => {
  const { postId } = useParams();

  if (!postId) {
    return <Navigate to="notFound" replace />;
  }

  return (
    <div className={s.post_page}>
      <Post postId={postId} />
      <CommentsBlock postId={postId} />
    </div>
  );
};
