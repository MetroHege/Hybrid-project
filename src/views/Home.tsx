import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <div className="mx-auto w-4/5">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Welcome to MediaWave!
        </h1>
        <p className="mb-10 text-center text-lg">
          This application is designed to provide a platform for users to share
          and explore various media files. You can upload your favorite images
          or videos, and discover amazing content shared by other users. Enjoy
          the experience of social media sharing right at your fingertips!
        </p>
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
