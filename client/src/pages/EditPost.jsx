import React, { useRef, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Editor from '../components/Editor';
import Quill from 'quill';
import { updatePost } from '../utils/api';
import 'quill/dist/quill.snow.css';

const Delta = Quill.import('delta');

const EditPost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const post = location.state;
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  useEffect(() => {
    const post = location.state;
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [postId]);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const handleTextChange = (newContent) => {
    setContent(newContent);
  };

  const handleClick = (e) => {
    e.preventDefault();
    updatePost(postId, title, content);
    console.log('Post Updated');
  };

  return (
    <main className="fixed flex flex-col left-72 top-20 w-[calc(100vw-20rem)] h-[calc(100vh-10rem)]">
      <input
        type="text"
        placeholder="Title"
        className="outline-none border-0 border-b-2 w-5/6 h-8 p-2 mx-auto mb-1 text-lg text-center"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        ref={quillRef}
        value={content}
        onTextChange={handleTextChange}
      />
      <button
        className="border-2 p-2 m-2 ml-auto mr-24 fixed bottom-5 right-10"
        onClick={handleClick}
      >
        Publish
      </button>
    </main>
  );
};

export default EditPost;