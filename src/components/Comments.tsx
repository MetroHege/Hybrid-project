import {useEffect, useRef} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/FormHooks';
import {useCommentStore} from '../store';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useComment} from '../hooks/apiHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const {getCommentsByMediaId, postComment} = useComment();

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, item.media_id, token);
      await getComments();

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('postComment failed', error);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doComment,
    initValues,
  );

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      console.error('getComments failed', error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <>
          <h3 className="mb-2 mt-4 text-xl">Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.comment_id}>
                <div className="rounded-md border border-slate-200 bg-slate-800 p-3 text-slate-100">
                  <span className="font-bold text-slate-200">
                    {comment.username}
                  </span>
                  <span className="text-sm font-bold text-slate-200">
                    {' ('}
                    {new Date(comment.created_at!).toLocaleDateString('fi-FI')}
                    {') '}:
                  </span>
                  <span className="ml-2 ">{comment.comment_text}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {user && (
        <>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex w-4/5">
              <input
                className="mt-3 w-2/3 rounded border border-slate-200 bg-slate-800 p-2 text-slate-950"
                name="comment_text"
                type="text"
                id="comment"
                placeholder="Write a comment..."
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-4/5 justify-start">
              <button
                className="mb-3 mt-3 w-1/3 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 text-black hover:font-bold"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Comments;
