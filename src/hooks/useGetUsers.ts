import { useCallback, useEffect, useState } from 'react';
import { TUser, TUsersObj } from '../types/hooks/useGetUsers';
import { redirect } from 'react-router-dom';

const useGetUsers = (id?: string) => {
  const [usersObj, setUsersObj] = useState<TUsersObj>({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<TUser[]>([]);

  const getUsersInfo = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId ? userId : ''}`
      );
      if (response.status === 404) {
        setLoading(false);
        return window.location.replace('/404');
      }
      const userInfoRes = await response.json();
      if (!Array.isArray(userInfoRes)) {
        setUsers([userInfoRes]);
        return setLoading(false);
      }
      const usersInfoToObj = userInfoRes.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      setUsersObj(usersInfoToObj);
      setUsers(userInfoRes);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUsersInfo(id);
  }, [getUsersInfo, id]);

  return {
    usersObj,
    loading,
    users,
    getUsersInfo,
  };
};

export default useGetUsers;
