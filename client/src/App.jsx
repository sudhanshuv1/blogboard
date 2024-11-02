import { useEffect } from 'react';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CreateBlog from './pages/CreateBlog';
import EditPost from './pages/EditPost';
import Layout from './pages/Layout';
import Themes from './pages/Themes';
import Views from './pages/Views';
import Comments from './pages/Comments';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Wrapper from './components/Wrapper';

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element = {<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        
        <Route path='/blog'>
          <Route index element={<CreateBlog />} />
          <Route path=':blogId'>
            <Route element={<Wrapper />}>
              <Route index element={<Landing />} />
              <Route path='post' >
                <Route path=':postId' element={<EditPost />} />
              </Route>
              <Route path='layout' element={<Layout />} />
              <Route path='themes' element = {<Themes />}/>
              <Route path='views' element={<Views />}/>
              <Route path='comments' element={<Comments />} />
              <Route path='settings' element={<Settings />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
