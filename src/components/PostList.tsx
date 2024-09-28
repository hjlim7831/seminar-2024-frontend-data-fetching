import './css/PostList.css';

import type { PostBrief } from '../App';

type PostListProps = {
  posts: PostBrief[];
  onClick: (id: number) => void;
};

export const PostList = ({ posts, onClick }: PostListProps) => {
  return (
    <div className="post-list-container">
      <div className="title">포스트 목록</div>
      <ol className="post-list-item-container">
        {posts.map((post) => (
          <li
            key={post.id}
            className="post-list-item"
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
