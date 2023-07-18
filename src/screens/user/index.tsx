import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import useGetPosts from '../../hooks/useGetPosts';
import PostCard from '../../components/postCard';
import { AppContext } from '../../context/appContext';

type Props = {};

const User = (props: Props) => {
  const { id } = useParams();
  const { loading: loadingUser, users } = useGetUsers(id);
  const { loading: loadingPosts, allPosts } = useGetPosts(id);
  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle(users[0]?.name);
  }, [users]);

  return (
    <div className='container mx-auto'>
      {loadingUser || loadingPosts ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-row '>
          <div className='flex flex-col gap-3 p-5 mt-10 card h-fit'>
            <h1>{users[0]?.name}</h1>
            <p>{users[0]?.email}</p>
            <p>{users[0]?.phone}</p>
            <p>{users[0]?.website}</p>
          </div>
          <div className='flex flex-row flex-wrap justify-center gap-3 mt-5'>
            {allPosts?.map((post) => (
              <PostCard key={post.id} post={post} userName={users[0]?.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
