import React, { useCallback, useContext, useEffect, useState } from 'react';
import useGetPosts from '../../hooks/useGetPosts';
import FullscreenLoader from '../../components/fullscreenLoader';
import useGetUsers from '../../hooks/useGetUsers';
import PostCard from '../../components/postCard';
import { AppContext } from '../../context/appContext';
import Modal from '../../components/modal';

const Home = () => {
  const {
    posts,
    loading: postsLoading,
    prevPage,
    currentPage,
    nextPage,
    totalPages,
    handleFilterChange,
    filters,
  } = useGetPosts();

  const { loading: usersLoading, users, usersObj } = useGetUsers();
  const { setTitle, showToast } = useContext(AppContext);

  const [createArticleModal, setCreateArticleModal] = useState(false);
  const [error, setError] = useState({
    title: false,
    body: false,
  });
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');

  const submitArticle = useCallback(async () => {
    if (!articleTitle) {
      setError((prev) => ({ ...prev, title: true }));
      return;
    }
    if (!articleBody) {
      setError((prev) => ({ ...prev, body: true }));
      return;
    }
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: articleTitle,
          body: articleBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      showToast('Article created successfully');
      setArticleTitle('');
      setArticleBody('');
    } catch (e) {
      console.log(e);
    }
    setCreateArticleModal(false);
  }, [articleTitle, articleBody]);

  useEffect(() => {
    setTitle('Home');
  }, []);

  return (
    <div className='container mx-auto'>
      {postsLoading || usersLoading ? (
        <FullscreenLoader />
      ) : (
        <>
          <div className='flex flex-row flex-wrap items-center justify-center gap-3 mt-5'>
            <select
              className='p-2 border-2 border-gray-300 rounded-lg'
              onChange={handleFilterChange}
              value={filters.userId}
              name='userId'
            >
              <>
                <option value=''>All Users</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </>
            </select>
            <input
              type='text'
              className='p-2 border-2 border-gray-300 rounded-lg'
              onChange={handleFilterChange}
              name='text'
              value={filters.text}
            />
            <button
              className='btn'
              onClick={() => {
                setCreateArticleModal(true);
              }}
            >
              Create article
            </button>
          </div>

          <div className='flex flex-row flex-wrap justify-center gap-3 mt-5'>
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                userName={usersObj?.[post?.userId]?.name}
              />
            ))}
          </div>
        </>
      )}
      {!filters?.userId && !filters?.text ? (
        <div className='flex justify-center gap-2 my-10'>
          <button
            className='btn'
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className='btn'
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      ) : null}
      <Modal
        isVisible={createArticleModal}
        closeModal={() => setCreateArticleModal(false)}
        onCancel={() => setCreateArticleModal(false)}
        title='Create Article'
        onOk={submitArticle}
      >
        <input
          type='text'
          placeholder='Title'
          className={`mb-3 input  ${
            error.title ? 'border-red-500 border-solid border ' : ''
          }`}
          required
          value={articleTitle}
          onChange={(e) => {
            setArticleTitle(e.target.value);
            if (error.title) {
              setError((prev) => ({ ...prev, title: false }));
            }
          }}
        />
        {error.title ? <p className='text-red-500'>Title is required</p> : null}
        <br />

        <textarea
          placeholder='Body'
          className={`input  ${
            error.body ? 'border-red-500 border-solid border ' : ''
          }`}
          required
          value={articleBody}
          onChange={(e) => {
            setArticleBody(e.target.value);
            if (error.body) {
              setError((prev) => ({ ...prev, body: false }));
            }
          }}
        />
        {error.body ? <p className='text-red-500'>Body is required</p> : null}
      </Modal>
    </div>
  );
};

export default Home;
