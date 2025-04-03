import React, { useState, useEffect } from 'react';
import { getBlog, deletePost } from '../utils/api';
import { useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';

const Landing = () => {
  const [posts, setPosts] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blog = await getBlog(blogId);
        setPosts(blog.posts.sort((post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [blogId]);

  const handleDelete = (id) => {
    console.log(`Post with id = ${id} deleted`);
    deletePost(id);
    setPosts(posts.filter((post) => post.id !== id).sort((post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)));
  };

  return (
    <>
      <main className="w-[calc(100vw-20rem)] ml-60 mt-14 pt-6">
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