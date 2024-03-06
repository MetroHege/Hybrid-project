import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  // console.log('user', user);

  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();

  const deleteHandler = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const result = deleteMedia(item.media_id, token);
      console.log('delete result', result);
      setUpdate(!update);
    } catch (error) {
      console.error('deleteHandler failed', error);
    }
  };

  return (
    <tr className="media-row mx-auto w-4/5 shadow-md">
      <td>
        <img src={item.thumbnail} alt={item.title} className="max-w-xs" />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td className="hidden">{item.filesize}</td>
      <td className="hidden">{item.media_type}</td>
      <td>{item.username}</td>
      <td className="p-4">
        <div className="mb-2">
          <Link
            className="block flex items-center justify-center rounded-md bg-gradient-to-r from-slate-500 to-slate-800 p-2"
            to="/single"
            state={item}
          >
            View
          </Link>
        </div>
        {user && user.user_id === item.user_id && (
          <>
            <div className="mb-2">
              <button
                className="block rounded-md bg-gradient-to-r from-blue-600 to-blue-900 p-2"
                onClick={() => console.log('modify', item)}
              >
                Modify
              </button>
            </div>
            <div>
              <button
                className="block rounded-md bg-gradient-to-r from-rose-600 to-rose-900 p-2"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;
