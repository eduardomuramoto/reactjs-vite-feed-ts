import { format, formatDistanceToNow } from 'date-fns';
import enAU from 'date-fns/locale/en-AU';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps{
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState([
    'Congratz!!!👍'
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'at' HH:mm'h'", {
    locale: enAU,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enAU,
    addSuffix: true
  });

  function handleCrateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('This field is required.');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
          <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
              </header>
        <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>          }
        })}
      </div>
      
      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>        
      <strong>Leave your feedback</strong>
      <textarea
          name="comment"
          placeholder="Leave your feedback"
          value={newCommentText}
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
      {comments.map(comment => {
             return (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={deleteComment}
              />
            )
        })}
      </div>
    </article>
  )
}