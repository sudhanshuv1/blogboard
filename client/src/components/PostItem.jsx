import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillDelete } from "react-icons/ai";

const PostItem = ({post, handleDelete}) => {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("POST = " + post);
    navigate(`post/${post.id}`, { state: post });
  }

  return (
   <li className="m-3">
    <div className="w-fit ml-auto">
      <AiFillDelete className="hover:cursor-pointer hover:text-red-400 text-xl" onClick = {() => handleDelete(post.id)}/>
    </div>
    <div className="border-2 rounded h-1/6 w-full p-2 hover:cursor-pointer" onClick = {(e) => handleClick(e)}>
      <h2 className="text-xl">{post.title === '' ? 'Untitled' : post.title}</h2>
      <p className='my-2'>{post.content}</p>
    </div>
   </li>
  )
}

export default PostItem