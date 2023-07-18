export type TPost = {
  userId: number;
  body: string;
  id: number;
  title: string;
};

export type TComments = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};
