import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';
import {MediaItemWithOwner, User} from '../types/DBTypes';
import {fetchData} from '../lib/functions';

const Home = () => {
  const {mediaArray} = useMedia();
  const [userCount, setUserCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);

  // Fetch user and media counts from the API
  const getAllUsers = async () => {
    return await fetchData<User[]>(import.meta.env.VITE_AUTH_API + '/users');
  };

  const getAllMedia = async () => {
    return await fetchData<MediaItemWithOwner[]>(
      import.meta.env.VITE_MEDIA_API + '/media',
    );
  };

  useEffect(() => {
    getAllUsers().then((users: User[]) => setUserCount(users.length));
    getAllMedia().then((media: MediaItemWithOwner[]) =>
      setMediaCount(media.length),
    );
  }, []);

  return (
    <>
      <div className="mx-auto flex w-4/5">
        <div className="w-1/2 pr-8">
          <h1 className="mb-4 text-4xl font-bold">Welcome to MediaWave!</h1>
          <p className="mb-10 text-lg">
            This application is designed to provide a platform for users to
            share and explore various media files. You can upload your favorite
            images or videos, and discover amazing content shared by other
            users. Enjoy the experience of social media sharing right at your
            fingertips!
          </p>
        </div>
        <div className="flex w-1/2 flex-col justify-center pl-8">
          <p className="text-center">We're growing fast! We already:</p>
          <p className="text-center">
            Users: <strong>{userCount}</strong>
          </p>
          <p className="text-center">
            Media items: <strong>{mediaCount}</strong>
          </p>
        </div>
      </div>
      <table className="mx-auto w-4/5 border-collapse">
        <thead className="text-xl ">
          <tr>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
