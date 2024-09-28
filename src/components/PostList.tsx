import './css/PostList.css';

import type { PostBrief } from '../App';

type PostListProps = {
  posts: PostBrief[];
  selectedPostId: number;
  onClick: (id: number) => void;
};

export const PostList = ({ posts, onClick, selectedPostId }: PostListProps) => {
  return (
    <div className="post-list-container">
      <div className="title">포스트 목록</div>
      <ol className="post-list-item-container">
        {posts.map((post) => (
          <li
            key={post.id}
            className={`post-list-item ${selectedPostId === post.id ? 'selected' : ''}`}
            onClick={() => {
              onClick(post.id);
            }}
          >
            {post.title}
          </li>
        ))}
      </ol>
    </div>
  );
};
