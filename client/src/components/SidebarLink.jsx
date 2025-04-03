import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPost } from '../utils/api'

const SidebarLink = ({linkId, text, path, icon, selected, setSelected}) => {

  const navigate = useNavigate();

  const highlighted_class="pl-8 my-2 h-14 rounded p-2 font-semibold w-full hover:cursor-pointer bg-gray-400";
  const normal_class="pl-8 my-2 h-14 rounded p-2 font-semibold w-full hover:cursor-pointer hover:bg-gray-400";

  const { blogId } = useParams();

  const handleClick = async () => {

    setSelected(linkId);
    if(text === 'Create Post') {
      const post = await createPost({
        blogId: blogId,
        title: '',
        content: ''
      })
      console.log(post);
      navigate(path + '/' + blogId + '/' + post.id, { state: post });
    }
    else {
      navigate(path + '/' + blogId);
    }
  }

  return (
    <li 
      className={`${selected == linkId ? highlighted_class : normal_class}`}
      onClick={handleClick}  
    >
     {icon()}
     <p className="inline text-lg pl-2">{text}</p>
    </li>
  )
}

export default SidebarLink