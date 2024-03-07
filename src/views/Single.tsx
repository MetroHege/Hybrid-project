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
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-6 rounded p-8 shadow-lg">
        <h3 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-3xl font-bold ">
          {item.title}
        </h3>
        <div className="min-h-[200px] w-full min-w-[600px] max-w-[800px]">
          {item.media_type.includes('video') ? (
            <video
              controls
              src={item.filename}
              className="h-full w-full object-cover"
            ></video>
          ) : (
            <img
              src={item.filename}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <Likes item={item} />
        <div className="flex">
          <p className=" text-2xl">
            {item.username}
            {': '}
          </p>
          <p className="ml-2 text-2xl">{item.description}</p>
        </div>
        <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
        <div className="flex w-3/5 flex-col">
          <label className="hidden text-left font-bold" htmlFor="comments">
            Comments
          </label>
          <Comments item={item} />
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Single;
