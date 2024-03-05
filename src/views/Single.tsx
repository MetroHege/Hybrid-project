import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  //console.log('single state', state);
  const item: MediaItemWithOwner = state;

  return (
    <div className=" m-6">
      <h3 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
        {item.title}
      </h3>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <Likes item={item} />
      <div className="flex">
        <p className=" text-2xl">
          {item.username}
          {': '}
        </p>
        <p className="ml-2 text-2xl">{item.description}</p>
      </div>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <Comments item={item} />
      <p className="hidden">{item.filesize}</p>
      <p className="hidden">{item.media_type}</p>
      <div>
        <button
          className="mt-4 rounded-md bg-gradient-to-r from-rose-600 to-rose-900 p-2 text-black"
          onClick={() => {
            navigate(-1);
          }}
        >
          🢀 Go back
        </button>
        {/* <Comments /> */}
      </div>
    </div>
  );
};

export default Single;
