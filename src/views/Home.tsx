import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/GraphQLHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <div className="media-wave-info rounded p-8 shadow-lg">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Welcome to MediaWave
        </h2>
        <p className="mb-4 text-lg">
          MediaWave is a revolutionary platform designed for sharing media
          content seamlessly and building vibrant communities around shared
          interests.
        </p>
        <p className="mb-4 text-lg">Discover a world of creativity:</p>
        <ul className="mb-4 ml-8 list-disc">
          <li>
            Share your favorite images, photographs, and visual artwork with
            friends, family, and fellow enthusiasts.
          </li>
          <li>
            Explore a diverse range of content from talented creators around the
            globe.
          </li>
          <li>
            Connect with like-minded individuals who share your passions and
            interests.
          </li>
          <li>
            Engage in meaningful conversations, discussions, and collaborations
            within our supportive community.
          </li>
          <li>
            Stay up-to-date with the latest trends, events, and updates in the
            world of media and visual arts.
          </li>
          <li>
            Gain inspiration, feedback, and encouragement from a network of
            passionate creators and enthusiasts.
          </li>
          <li>
            Customize your profile, showcase your portfolio, and build your
            personal brand as a content creator.
          </li>
          <li>
            Monetize your content and earn recognition for your work through
            likes, shares, and comments.
          </li>
        </ul>
        <p className="mb-4 text-lg">
          Join us on MediaWave and embark on a journey of creativity, discovery,
          and connection!
        </p>
      </div>

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
