import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPost } from '../utils/api'

const SidebarLink = ({linkId, text, path, icon, selected}) => {

  const navigate = useNavigate();

  const highlighted_class="pl-8 my-2 h-14 rounded p-2 font-semibold w-full hover:cursor-pointer bg-gray-400";
  const normal_class="pl-8 my-2 h-14 rounded p-2 font-semibold w-full hover:cursor-pointer hover:bg-gray-400";

  const { blogId } = useParams();

  const handleClick = async () => {

    if(path.includes('post')) {
      const post = await createPost({
        blogId: blogId,
        title: '',
        content: ''
      })
      console.log(post);
      navigate('/blog/' + blogId + '/post/' + post.id, { state: post });
    }
    else {
      navigate('/blog/' + blogId + '/' + path);
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