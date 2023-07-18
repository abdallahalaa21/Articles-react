import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetPosts from '../../hooks/useGetPosts';
import FullscreenLoader from '../../components/fullscreenLoader';
import { TComments } from '../../types/hooks/useGetPosts';
import { AppContext } from '../../context/appContext';

type Props = {};

const Posts = (props: Props) => {
  const { id } = useParams();
  const { loading, allPosts, getComments } = useGetPosts('', id);
  const [comments, setComments] = useState<TComments[]>([]);
  const { setTitle } = useContext(AppContext);
  const getPostComments = useCallback(async () => {
    const res = await getComments(id);
    setComments(res);
  }, [id]);

  useEffect(() => {
    getPostComments();
  }, []);

  useEffect(() => {
    setTitle(allPosts[0]?.title);
  }, [allPosts]);

  return (
    <div className='container mx-auto'>
      {loading ? (
        <FullscreenLoader />
      ) : (
        <>
          <div className='mt-10'>
            <h1 className='text-3xl font-bold'>{allPosts[0]?.title}</h1>
            <p className='mt-3 text-xl'>{allPosts[0]?.body}</p>
          </div>
          <div className='mt-20'>
            <p className='text-blue-500'>Comments</p>
            <div className='flex flex-col gap-5'>
              {comments?.map((comment) => (
                <div
                  className='flex flex-col gap-3 p-5 card h-fit'
                  key={comment.id}
                >
                  <p className='text-lg font-bold'>{comment?.name}</p>
                  <p className='text-sm font-thin'>{comment?.email}</p>
                  <p>{comment?.body}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
