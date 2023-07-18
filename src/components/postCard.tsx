import React from 'react';
import { Link } from 'react-router-dom';
import { TPost } from '../types/hooks/useGetPosts';

type Props = {
  post: TPost;
  userName: string;
};

const PostCard = ({ post, userName }: Props) => (
  <div className='flex flex-col justify-between card w-96'>
    <div className='p-6'>
      <h5 className='mb-2 text-xl font-semibold leading-snug tracking-normal text-blue-gray-900'>
        {post?.title}
      </h5>
      <Link
        to={`/user/${post?.userId}`}
        className='text-sm font-medium leading-relaxed text-blue-600'
      >
        {userName}
      </Link>

      <p className='text-base font-light leading-relaxed text-inherit'>
        {post?.body}
      </p>
    </div>
    <div className='self-center p-6 pt-0'>
      <Link to={`/posts/${post?.id}`} className='btn'>
        Read More
      </Link>
    </div>
  </div>
);

export default PostCard;
