import React, { useState, useEffect } from 'react';
import { useGetBlogQuery, useDeletePostMutation } from '../features/apiSlice';
import { useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';

const Landing = () => {
  const { blogId } = useParams();

  const { data: blog, isLoading: isBlogLoading, isError: isBlogError, error: blogError } = useGetBlogQuery(blogId);

  const [deletePost, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeletePostMutation();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (blog) {
      setPosts(blog.posts.sort((post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)));
    }
  }, [blog]);

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
      setPosts(posts.filter((post) => post.id !== id).sort((post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (isBlogLoading) {
    return <p className="text-center mt-10">Loading blog...</p>;
  }

  if (isBlogError) {
    return <p className="text-center mt-10 text-red-500">Error: {blogError?.data?.message || 'Failed to load blog.'}</p>;
  }

  return (
    <>
      <main className="w-[calc(100vw-20rem)] ml-60 mt-14 pt-6">
        {isDeleteLoading && <p className="text-center text-blue-500">Deleting post...</p>}
        {isDeleteError && <p className="text-center text-red-500">Error: {deleteError?.data?.message || 'Failed to delete post.'}</p>}
        <ul className="flex flex-col justify-start">
          {posts.map((post) => {
            return <PostItem post={post} key={post.id} handleDelete={handleDelete} />;
          })}
        </ul>
      </main>
    </>
  );
};

export default Landing;