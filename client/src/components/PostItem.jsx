import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import DOMPurify from 'dompurify';

const PostItem = ({ post, handleDelete }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${post.id}`, { state: post });
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
  };

  const truncatedContent = truncateContent(post.content, 20); // Adjust the word limit as needed

  return (
    <li className="m-3">
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-32">
        <div className="absolute top-2 right-2 group">
          <AiFillDelete
            className="hover:cursor-pointer hover:text-red-500 text-2xl text-gray-400"
            onClick={() => handleDelete(post.id)}
          />
          <span className="absolute top-8 right-0 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Delete
          </span>
        </div>
        <div
          className="px-4 py-2 hover:cursor-pointer h-full flex flex-col justify-between"
          onClick={(e) => handleClick(e)}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
            {post.title === '' ? 'Untitled' : post.title}
          </h2>
          <p
            className="text-gray-600 text-sm leading-relaxed line-clamp-3 overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(truncatedContent),
            }}
          ></p>
        </div>
      </div>
    </li>
  );
};

export default PostItem;