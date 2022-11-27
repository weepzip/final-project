import { useAppSelector, useAppDispatch } from "../../hooks";
import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import s from "../NewPost/NewPost.css";
import {
  selectEditingPost,
  selectIsPostLoading,
} from "../../store/post/selectors";
import { fetchPost, setEditingPostData, updatePost } from "../../store/post";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { ButtonTypes } from "../../constants/ButtonTypes";
import { Button } from "../Button/Button";

export const EditPost = (): JSX.Element | null => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const editingPost = useAppSelector(selectEditingPost);
  const isLoading = useAppSelector(selectIsPostLoading);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postId) {
    return <Navigate to="notFound" replace />;
  }

  if (!editingPost) return <div>Something went wrong</div>;

  const { title, body } = editingPost;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditingPostData({ ...editingPost, title: e.target.value }));
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setEditingPostData({ ...editingPost, body: e.target.value }));
  };

  const handleSubmit = () => {
    dispatch(updatePost());
  };

  return (
    <div className={s.new_post}>
      <h1>Edit post</h1>
      <div>
        <input
          type="text"
          name="post-body"
          id="post-body"
          onChange={handleTitleChange}
          value={title}
        />
        <Button
          onClick={handleSubmit}
          className={ButtonTypes.submit}
          disabled={isLoading}
        >
          Save
        </Button>
      </div>
      <div>
        <textarea
          name="body"
          id="body"
          className={s.input}
          value={body}
          onChange={handleBodyChange}
        />
      </div>
    </div>
  );
};
