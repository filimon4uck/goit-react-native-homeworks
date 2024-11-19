import { CommentType } from "./commentType";

export type PostType = {
  id: string;
  title: string;
  photoURL: string;
  coordinates?: { longitude: number; latitude: number };
  country: string;
  comments: CommentType[] | [];
  likes: number;
};
