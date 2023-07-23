import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetPosts from '../../hooks/useGetPosts';
import FullscreenLoader from '../../components/fullscreenLoader';
import { TComments } from '../../types/hooks/useGetPosts';
import { AppContext } from '../../context/appContext';
import Modal from '../../components/modal';

type Props = {};

const Posts = (props: Props) => {
  const { id } = useParams();
  const { loading, allPosts, getComments } = useGetPosts('', id);
  const { setTitle, showToast } = useContext(AppContext);

  const [comments, setComments] = useState<TComments[]>([]);
  const [createCommentModal, setCreateCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);
  const getPostComments = useCallback(async () => {
    const res = await getComments(id);
    setComments(res);
  }, [id]);

  const createComment = useCallback(async () => {
    if (!comment) {
      setError(true);
      return;
    }
    setCreateCommentModal(false);
    showToast('Comment created successfully');
    setComment('');
  }, [comment]);

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
            <div className='flex items-center gap-4'>
              <p className='text-blue-500'>Comments</p>
              <button
                className='btn'
                onClick={() => {
                  setCreateCommentModal(true);
                }}
              >
                Create comment
              </button>
            </div>
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
      <Modal
        isVisible={createCommentModal}
        closeModal={() => setCreateCommentModal(false)}
        onCancel={() => setCreateCommentModal(false)}
        title='Create Comment'
        onOk={createComment}
      >
        <input
          type='text'
          placeholder='Comment'
          className={`mb-3 input  ${
            error ? 'border-red-500 border-solid border ' : ''
          }`}
          required
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (error) {
              setError(false);
            }
          }}
        />
        {error ? <p className='text-red-500'>Comment is required</p> : null}
      </Modal>
    </div>
  );
};

export default Posts;
