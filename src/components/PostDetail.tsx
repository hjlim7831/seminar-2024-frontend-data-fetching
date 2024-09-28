import './css/PostDetail.css';

import type { Comment } from '../App';

type PostDetailProps = {
  body: string;
  comments: Comment[];
};

export const PostDetail = ({ body, comments = [] }: PostDetailProps) => {
  return (
    <div className="post-detail-container">
      <div className="title">내용</div>
      <div className="post-detail-body">{body}</div>
      <div className="title">댓글</div>
      <div className="comments-container">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-email">작성자 : {comment.email}</div>
            <div className="comment-body">{comment.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
