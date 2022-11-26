import React from "react";
import { useParams } from "react-router-dom";

export const Album = (): JSX.Element => {
  const { albumId } = useParams();
  return <div>{albumId}</div>;
};
