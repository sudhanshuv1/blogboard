import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedIndex } from '../features/uiSlice'
import { createPost } from '../utils/api'

const SidebarLink = ({linkId, text, path, icon}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedIndex = useSelector((state) => state.ui.selectedIndex);

  const highlighted_class="pl-8 my-2 h-14 rounded p-2 font-semibold w-full hover:cursor-pointer bg-gray-400";
  const normal_class="pl-8 my-2 h-14 rounded p-2 font-semibold w-full hover:cursor-pointer hover:bg-gray-400";

  const { blogId } = useParams();

  const handleClick = async () => {
    dispatch(setSelectedIndex(linkId));
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
      className={`${selectedIndex == linkId ? highlighted_class : normal_class}`}
      onClick={handleClick}  
    >
     {icon()}
     <p className="inline text-lg pl-2">{text}</p>
    </li>
  )
}

export default SidebarLink