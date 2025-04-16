import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    },
  }), // API base URL
  endpoints: (builder) => ({

    // Profile endpoints
    signUp: builder.mutation({
      query: (newUser) => ({
        url: '/profile',
        method: 'POST',
        body: newUser,
      }),
    }),
    checkForDuplicate: builder.query({
      query: (email) => ({
        url: '/profile/email',
        method: 'POST',
        body: { email },
      }),
    }),
    getProfile: builder.query({
      query: (userId) => `/profile/${userId}`,
    }),
    updateProfile: builder.mutation({
      query: ({ userId, updatedData }) => ({
        url: `/profile/${userId}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deleteProfile: builder.mutation({
      query: (userId) => ({
        url: `/profile/${userId}`,
        method: 'DELETE',
      }),
    }),

    // Authentication endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // Blog endpoints
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/blog',
        method: 'POST',
        body: newBlog,
      }),
    }),
    getBlog: builder.query({
      query: (id) => `/blog/${id}`,
    }),
    updateBlog: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/blog/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
    }),

    // Post endpoints
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/blog/post',
        method: 'POST',
        body: newPost,
      }),
    }),
    getPost: builder.query({
      query: (id) => `/blog/post/${id}`,
    }),
    updatePost: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/blog/post/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/blog/post/${id}`,
        method: 'DELETE',
      }),
    }),

  }),
});

export const {
  useSignUpMutation,
  useCheckForDuplicateQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useCreateBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
