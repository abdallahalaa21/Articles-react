import React, { useContext, useEffect } from 'react';
import useGetPosts from '../../hooks/useGetPosts';
import FullscreenLoader from '../../components/fullscreenLoader';
import useGetUsers from '../../hooks/useGetUsers';
import PostCard from '../../components/postCard';
import { AppContext } from '../../context/appContext';

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

  const { setTitle } = useContext(AppContext);

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
    </div>
  );
};

export default Home;
