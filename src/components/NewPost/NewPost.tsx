import { Button } from "../Button/Button";
import React, { ChangeEvent, useState } from "react";
import s from "./NewPost.css";
import { ButtonTypes } from "../../constants/ButtonTypes";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createPost } from "../../store/posts";
import { selectPostCreatingStatus } from "../../store/posts/selectors";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { setNewPostData } from "../../store/post";
import { selectNewPost } from "../../store/post/selectors";

export const NewPost: React.FC = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectPostCreatingStatus);
  const newPost = useAppSelector(selectNewPost);
  const { title, body, userId } = newPost;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewPostData({ ...newPost, title: e.target.value }));
  };
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setNewPostData({ ...newPost, body: e.target.value }));
  };

  const handleSubmit = () => {
    if (title && body) {
      dispatch(createPost());
    }
  };

  return (
    <div className={s.new_post}>
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
          disabled={status === LoadingStatuses.inProgress}
        >
          Create
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
