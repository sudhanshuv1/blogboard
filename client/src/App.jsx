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
          <Route path='/blog/' element={<Wrapper />}>
            <Route path='posts/:blogId' element={<Landing />} />
            <Route path='posts/:blogId/:postId' element={<EditPost />} />
            <Route path='layout/:blogId' element={<Layout />} />
            <Route path='themes/:blogId' element = {<Themes />}/>
            <Route path='views/:blogId' element={<Views />} />
            <Route path='comments/:blogId' element={<Comments />} />
            <Route path='settings/:blogId' element={<Settings />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
