import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

import { PostDetail } from './components/PostDetail';
import { PostList } from './components/PostList';

export type PostBrief = {
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  email: string;
  body: string;
};

type PostDetailType = {
  id: number;
  title: string;
  body: string;
};

const baseURL = 'https://jsonplaceholder.typicode.com';

const fetchPosts = async () => {
  const response = await fetch(`${baseURL}/posts`);
  const data = (await response.json()) as PostBrief[];
  return data;
};

const fetchPostDetail = async (postId: number) => {
  const response = await fetch(`${baseURL}/posts/${postId}`);
  const data = (await response.json()) as PostDetailType;
  return data;
};

const fetchComments = async (postId: number) => {
  const response = await fetch(`${baseURL}/posts/${postId}/comments`);
  const data = (await response.json()) as Comment[];
  return data;
};

export const App = () => {
  const [posts, setPosts] = useState<PostBrief[]>([]);
  const [postId, setPostId] = useState<number>(1);
  const [postDetail, setPostDetail] = useState<PostDetailType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleOnClickListItem = (id: number) => {
    setPostId(id);
    console.debug(id);
  };

  useEffect(() => {
    let ignore = false;
    fetchPosts()
      .then((data) => {
        if (!ignore) setPosts(data);
      })
      .catch((err: unknown) => {
        console.error(err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    fetchPostDetail(postId)
      .then((data) => {
        if (!ignore) setPostDetail(data);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
    fetchComments(postId)
      .then((data) => {
        if (!ignore) setComments(data);
      })
      .catch((err: unknown) => {
        console.error(err);
      });

    return () => {
      ignore = true;
    };
  }, [postId]);

  return (
    <div className="app">
      <div className="app-column">
        <PostList posts={posts} onClick={handleOnClickListItem} />
      </div>
      <div className="vertical-divider" />
      <div className="app-column">
        {postDetail !== null ? (
          <PostDetail
            key={postDetail.id}
            body={postDetail.body}
            comments={comments}
          />
        ) : null}
      </div>
    </div>
  );
};
