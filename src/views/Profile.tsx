import MediaRow from '../components/MediaRow';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

const Profile = () => {
  const {mediaArray} = useMedia();
  const {user} = useUserContext();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {user && (
        <>
          <div className="rounded-lg bg-gray-200 p-4">
            <p className="text-2xl font-bold text-gray-800">{user.username}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">
              Created: {new Date(user.created_at).toLocaleString('fi-FI')}
            </p>
          </div>
        </>
      )}

      <table className="w-full border-collapse">
        <thead className="text-xl text-white">
          <tr>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray
            .filter((item) => item.user_id === user?.user_id)
            .map((item) => (
              <MediaRow key={item.media_id} item={item} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
