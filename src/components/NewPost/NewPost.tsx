import { Button } from "../Button/Button";
import React, { ChangeEvent, useState } from "react";
import s from "./NewPost.css";
import { ButtonTypes } from "../../constants/ButtonTypes";

export const NewPost: React.FC = (): JSX.Element | null => {
  const [text, setText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={s.new_post}>
      <input
        type="text"
        name="post-body"
        id="post-body"
        onChange={handleChange}
        value={text}
      />
      <Button onClick={() => {}} className={ButtonTypes.submit}>
        Create
      </Button>
    </div>
  );
};
