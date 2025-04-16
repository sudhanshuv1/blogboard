import React, { useState, useEffect } from 'react';
import { useGetBlogQuery, useDeletePostMutation } from '../features/apiSlice';
import { useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';

const Landing = () => {
  const { blogId } = useParams();

  // Fetch blog data using useGetBlogQuery
  const {
    data: blog,
    isLoading: isBlogLoading,
    isError: isBlogError,
    error: blogError,
    refetch, // Refetch function to manually trigger a re-fetch
  } = useGetBlogQuery(blogId);

  const [deletePost, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeletePostMutation();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (blog) {
      // Create a new copy of the posts array before sorting
      const sortedPosts = [...blog.posts].sort(
        (post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)
      );
      setPosts(sortedPosts); // Update the state with the sorted array
    }
  }, [blog]);

  // Refetch blog data every time the component re-renders
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
      refetch(); // Refetch the blog data after deleting a post
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <>
      <main className="w-[calc(100vw-20rem)] ml-60 mt-14 pt-6">
        {isDeleteError && <p className="text-center text-red-500">Error: {deleteError?.data?.message || 'Failed to delete post.'}</p>}
        {isBlogLoading ? (
          <p className="text-center mt-10">Loading blog...</p>
        ) : isBlogError ? (
          <p className="text-center text-red-500">
            Error loading blog: {blogError?.data?.message || 'Failed to load blog.'}
          </p>
        ) : (
          <ul className="flex flex-col justify-start">
            {posts.map((post) => {
              return <PostItem post={post} key={post.id} handleDelete={handleDelete} />;
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default Landing;