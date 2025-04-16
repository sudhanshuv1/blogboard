// import axios from "axios";

const url = "http://localhost:5000";

const login = async ({email, password}) => {
  try {
    const response = await axios.post(`${url}/auth`, {email, password});
    console.log("Response = ", response);
    localStorage.setItem('token', response.data.accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    return response.data;
   } catch (error) {
    return error;
  }
}

const logout = () => {
  localStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
};

const checkForDuplicate = async (email) => {
  try {
    const response = await axios.post(`${url}/profile/email`, {email});
    if(response.status == 200) {
      return false;
    }
    else {
      return true;
    }
  } catch (error) {
    return error;
  }
}

const signUp = async ({name, email, password}) => {
  try {
    const response = await axios.post(`${url}/profile`, {name, email, password});
    return response.data;
  }
  catch (error) {
    return error;
  }
};

const createBlog = async ({name}) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.post(`${url}/blog`, {name});
    return response.data;
  } catch (error) {
    return error;
  }
};

const createPost = async ({blogId, title, content}) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.post(`${url}/blog/post`, {blogId, title, content});
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    return error;
  }
}

const updatePost = async (id, title, content) => {
  try {
    const response = await axios.patch(`${url}/blog/post/${id}`, {title, content});
    return response.data;
  } catch (error) {
    return error;
  }
}

const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${url}/blog/post/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

const getBlog = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    console.log("A = " + axios.defaults.headers.common['Authorization']);
    const response = await axios.get(`${url}/blog/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export { login, logout, checkForDuplicate, signUp, updatePost, deletePost, createBlog, getBlog, createPost };