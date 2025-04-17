import React, { useRef, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Editor from '../components/Editor';
import { useUpdatePostMutation } from '../features/apiSlice';
import 'quill/dist/quill.snow.css';

const EditPost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const post = location.state;

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const [updatePost, { isLoading, isError, error }] = useUpdatePostMutation();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const quillRef = useRef();

  const handleTextChange = (newContent) => {
    setContent(newContent);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (quillRef.current) {
      await quillRef.current.handlePublish(title, postId, updatePost);
    }
  };

  return (
    <main className="fixed flex flex-col left-72 top-20 w-[calc(100vw-20rem)] h-[calc(100vh-10rem)]">
      <input
        type="text"
        placeholder="Title"
        className="outline-none border-0 border-b-2 w-5/6 h-8 px-2 mx-auto mb-1 text-lg text-center"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        ref={quillRef}
        value={content}
        onTextChange={handleTextChange}
      />
      {isError && <p className="text-red-500 text-center">{error?.data?.message || 'Failed to update post.'}</p>}
      <button
        className="absolute p-2 bottom-8 left-1/2 transform -translate-x-1/2 text-center rounded-md bg-gray-700 text-white border-black hover:scale-x-110 duration-150 ease-in-out"
        onClick={handlePublish}
        disabled={isLoading}
      >
        {isLoading ? 'Publishing...' : 'Publish'}
      </button>
    </main>
  );
};

export default EditPost;