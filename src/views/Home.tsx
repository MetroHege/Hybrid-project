import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <table className="w-full border-collapse">
        <thead className="text-xl text-white">
          <tr>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Created</th>
            {/* <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Type</th> */}
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
