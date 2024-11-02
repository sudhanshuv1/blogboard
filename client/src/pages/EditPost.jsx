import React, {useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { updatePost } from '../utils/api'
import ReactQuill from 'react-quill'
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'

const EditPost = ({}) => {


  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const location = useLocation();
  const post = location.state;  

  const { postId } = useParams();

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, []);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      ['link', 'image', 'video', 'formula'],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
                                       // remove formatting button
    ],
    syntax : { hljs }
  };

  const handleClick = () => {
    updatePost(postId, title, content);
    console.log('Post Updated');
  }
  
  return (
    <main className = "fixed flex flex-col left-72 top-20 w-[calc(100vw-20rem)] h-[calc(100vh-10rem)]">
      <input type="text" placeholder="Title" className="outline-none border-0 border-b-2 w-5/6 h-8 p-2 mx-auto text-lg text-center" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <ReactQuill 
        className="h-5/6 w-full border-0 p-2 my-4"
        theme="snow" 
        value={content} 
        onChange={setContent}
        modules = {modules}
      />
      <button className="border-2 p-2 m-2 ml-auto mr-24 fixed bottom-5 right-10" onClick={() => handleClick()}>Publish</button>
    </main>
  )
}

export default EditPost