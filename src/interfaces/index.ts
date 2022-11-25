export interface IPost {
  id: string | number;
  userId: string | number;
  title: string;
  body: string;
}

export interface IComment {
  id: string | number;
  postId: string | number;
  name: string;
  email: string;
  body: string;
}

export interface IAlbum {
  id: string | number;
  userId: string | number;
  title: string;
}

export interface IPhoto {
  id: string | number;
  albumId: string | number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface ITodo {
  id: string | number;
  userId: string | number;
  title: string;
  completed: boolean;
}

export interface IUser {
  id: string | number;
  name: string;
  username: string;
  email: string;
}
