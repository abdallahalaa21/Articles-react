import { useCallback, useEffect, useState } from 'react';
import { TPost } from '../types/hooks/useGetPosts';

const postsPerPage = 10;

const useGetPosts = (userId?: string, postId?: string) => {
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    text: '',
    userId: '',
  });

  const postsPagination = useCallback(
    (page: number) => {
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;
      setPosts([...allPosts].slice(start, end));
    },
    [allPosts]
  );

  const getPosts = useCallback(async (userId?: string, postId?: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${
          userId ? `userId=${userId}` : ''
        }${postId ? `&id=${postId}` : ''}`
      );
      const postsRes = await response.json();
      setAllPosts(postsRes);
      setTotalPages(Math.ceil(postsRes.length / postsPerPage));
      setCurrentPage(1);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  const getComments = useCallback(async (postId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const commentsRes = await response.json();
      return commentsRes;
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  }, []);

  const handleFilterSubmit = useCallback(() => {
    let filteredPosts = [...allPosts];
    if (filters.userId) {
      filteredPosts = filteredPosts.filter(
        (post) => post.userId.toString() === filters.userId
      );
    }
    if (filters.text) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.includes(filters.text) || post.body.includes(filters.text)
      );
    }
    setPosts(filteredPosts);
  }, [filters.text, filters.userId, allPosts]);

  useEffect(() => {
    postsPagination(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (filters.text || filters.userId) {
      handleFilterSubmit();
    } else {
      setCurrentPage(null);
      getPosts(userId, postId);
    }
  }, [filters.text, filters.userId, userId, postId]);

  return {
    posts,
    loading,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    handleFilterChange,
    filters,
    allPosts,
    getComments,
  };
};

export default useGetPosts;
