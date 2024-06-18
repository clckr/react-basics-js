import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";
import { useState } from "react";

import styles from "./Post.module.css";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["Nice!"]);
  const [newComment, setNewComment] = useState("");

  const publishedFormattedDate = format(
    publishedAt,
    "MMMM dd, yyyy 'at' hh:mm a",
    {
      locale: enUS,
    },
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enUS,
    addSuffix: true,
  });

  const isNewCommentEmpty = newComment.length === 0;

  function handleCommentSubmit() {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  }

  function handleNewCommentChange(event) {
    event.target.setCustomValidity("");
    setNewComment(event.target.value);
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeleted = comments.filter(
      (c) => c !== commentToDelete,
    );
    setComments(commentsWithoutDeleted);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity(
      "Please, write a comment before publishing.",
    );
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedFormattedDate}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href={line.content}>Click here</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <strong>Give your feedback</strong>
        <textarea
          name="comment"
          value={newComment}
          placeholder="Leave a comment"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publish
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
