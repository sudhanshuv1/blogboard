import React, { useState, useEffect} from 'react'
import { getBlog, deletePost } from '../utils/api'
import { useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';

const Landing = () => {


  const [posts, setPosts] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const blog = await getBlog(blogId);
      setPosts(blog.posts);
    };
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    console.log(`Post with id = ${id} deleted`);
    deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
   <>
    <main className="w-[calc(100vw-20rem)] ml-60 mt-20">
      <ul className="flex flex-col justify-start h-fit ">
        {posts.map((post) => {
          return (
            <PostItem post={post} key={post.id} handleDelete={handleDelete}/>
          )
        })}
      </ul>
    </main>
   </>
  )
}

export default Landing